import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, Modal, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { API } from '../../../../../config/axios';
import ProductsUpdateModal from './ProductsUpdateModal';
import { getBrands } from '../../../../../services/products';

const ProductsTable = ({ getProducts, data }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [brands, setBrands] = useState([]);
  const [productsUpdateModal, setProductsUpdateModal] = useState(false);

  const openUpdateModal = () => {
    setProductsUpdateModal(!productsUpdateModal)
  }

  const { confirm } = Modal;

  useEffect(() => {
    getBrands()
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "IMAGE",
      dataIndex: "images",
      key: "images",
      render: (images) => (images && images[0]?.url ? <img src={images[0].url} style={{ width: "80px", height: "100px" }} alt="Product" /> : null),
      width: "7%",
    },
    {
      title: "PRODUCT NAME",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      render: (text) => <a> {text} </a>,
      width: "20%",
    },
    {
      title: "BRAND",
      dataIndex: "brandId",
      key: "brandId",
      render: (brandId) => {
        const brand = brands.find((b) => b._id === brandId);
        return <p> {brand ? brand.name : "Brand"} </p>;
      },
      width: "10%",
    },
    {
      title: "PRICE",
      dataIndex: "productPrice",
      key: "productPrice",
      sorter: (a, b) => a.productPrice - b.productPrice,
      sortDirections: ["descend", "ascend"],
      render: (text) => <p> ${text} </p>,
      width: "10%",
    },
    {
      title: "SALE PRICE",
      dataIndex: "salePrice",
      key: "salePrice",
      sorter: (a, b) => a.salePrice - b.salePrice,
      sortDirections: ["descend", "ascend"],
      width: "10%",
      render: (text) => <p> ${text} </p>,
    },
    {
      title: "QUANTITY",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
    {
      title: "PUBLISHED",
      dataIndex: "isPublish",
      key: "isPublish",
      width: "7%",
      render: (isPublish, record) => (
        <Switch checked={isPublish} onChange={(checked) => handlePublishChange(checked, record)} />
      ),
    },
    {
      title: "DEAL",
      dataIndex: "isDeal",
      key: "isDeal",
      width: "7%",
      render: (isDeal, record) => (
        <Switch checked={isDeal} onChange={(checked) => handleDealChange(checked, record)} />
      ),

    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            style={{ background: "#EF2525", color: "white" }}
            onClick={() => handleDelete(record)}>
          </Button>
        </Space>
      ),
      width: "10%",
    },
  ];

  const handlePublishChange = (checked, record) => {
    const updatedProduct = { ...record, isPublish: checked };

    API.put(`/dashboard/products/${record._id}`, updatedProduct)
      .then(() => {
        getProducts();
        const updatedData = data.map((item) =>
          item._id === record._id ? updatedProduct : item
        );
        setData(updatedData);
        getProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDealChange = (checked, record) => {
    const updatedProduct = { ...record, isDeal: checked };

    API.put(`/dashboard/products/${record._id}`, updatedProduct)
      .then(() => {
        getProducts();
        const updatedData = data.map((item) =>
          item._id === record._id ? updatedProduct : item
        );
        setData(updatedData);
        getProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (record) => {
    console.log("Edit", record);
    setSelectedProduct(record);
    openUpdateModal();
  };

  const handleDelete = (record) => {
    confirm({
      title: `Do you want to delete "${record.title}"?`,
      content: "This action cannot be undone.",
      onOk() {
        API.delete(`/dashboard/products/${record._id}`)
          .then(() => {
            getProducts();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const handlePaginationChange = () => window.scrollTo(0, 0);

  return (
    <>
      <ProductsUpdateModal
        getProducts={getProducts}
        selectedProduct={selectedProduct}
        openUpdateModal={openUpdateModal}
        productsUpdateModal={productsUpdateModal}
      />
      <Table columns={columns} dataSource={Array.isArray(data) ? data.map((item, _id) => ({ ...item, key: _id })) : []}
        pagination={{ pageSize: 15, onChange: handlePaginationChange }} />
    </>
  );
};

export default ProductsTable;