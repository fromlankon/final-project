import React, { useState } from 'react';
import { Table, Space, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { API } from '../../../../../config/axios';
import BrandsUpdateModal from './BrandsUpdateModal';
import moment from 'moment';

const BrandsTable = ({ data, getBrands }) => {

    const [brandsUpdateModal, setBrandsUpdateModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState({});

    const { confirm } = Modal;

    const brandsUpdateModalOpen = () => {
        setBrandsUpdateModal(!brandsUpdateModal);
    };

    const columns = [
        {
            title: "BRAND LOGO",
            dataIndex: "image",
            key: "image",
            render: (image) => image && image.url ? (<img src={image.url} style={{ width: "50px", height: "50px" }} />) : null
        },
        {
            title: "BRAND NAME",
            dataIndex: "name",
            key: "name",
            render: (name) => <a style={{ userSelect: "none" }}> {name} </a>,
        },
        {
            title: "CREATED DATE",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => moment(createdAt).format('MMM DD, YYYY'),
        },
        {
            title: "UPDATED DATE",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt) => moment(updatedAt).format('MMM DD, YYYY'),
        },
        {
            title: "ACTIONS",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
                    <Button type="danger" icon={<DeleteOutlined />} style={{ background: "#EF2525", color: "white" }} onClick={() => handleDelete(record)}></Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        setSelectedBrand(record);
        brandsUpdateModalOpen();
    };

    const handleDelete = (record) => {
        confirm({
            title: `Do you want to delete "${record.name}" brand?`,
            centered: true,
            icon: null,
            width: 500,
            okText: "Delete",
            okButtonProps: {
                className: "delete-button"
            },
            onOk() {
                API.delete(`/dashboard/brands/${record._id}`)
                    .then(() => {
                        getBrands();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
        });
    };

    return (
        <>
            <BrandsUpdateModal
                productName={selectedBrand ? selectedBrand.name : ""}
                imageSrc={selectedBrand && selectedBrand.image && selectedBrand.image.url}
                getBrands={getBrands}
                brandId={selectedBrand._id}
                brandsUpdateModal={brandsUpdateModal}
                setBrandsUpdateModal={setBrandsUpdateModal}
                brandsUpdateModalOpen={brandsUpdateModalOpen} />
            <Table brandId={selectedBrand._id} columns={columns} dataSource={data.map((item, _id) => ({ ...item, key: _id }))} />
        </>
    );
}

export default BrandsTable;