import React from 'react';
import { Table, Space, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { API } from '../../../../../config/axios';

export default function UserTable({ data, getUser }) {

    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a style={{ userSelect: "none" }}> {text} </a>,
            width: "22%"
        },
        {
            title: 'SURNAME',
            dataIndex: 'surname',
            key: 'surname',
            render: (text) => <a style={{ userSelect: "none" }}> {text} </a>,
            width: "22%"
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a style={{ userSelect: "none" }}> {text} </a>,
            width: "22%"
        },
        {
            title: 'ROLE',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <a style={{ userSelect: "none" }}>{text}</a>,
            width: "22%"
        },
        {
            title: 'ACTIONS',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{ background: "#EF2525", color: "white" }}
                        onClick={() => handleDelete(record)} >
                    </Button>
                </Space>
            ),
        },
    ];

    const { confirm } = Modal;

    const handleDelete = (record) => {
        confirm({
            title: `Do you want to delete ${record.role} "${record.name} ${record.surname}"?`,
            centered: true,
            icon: null,
            width: 500,
            okText: "Delete",
            okButtonProps: {
                className: "delete-button"
            },
            width: 500,
            onOk() {
                API.delete(`/dashboard/users/${record._id}`)
                    .then(() => {
                        getUser();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    };

    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
}