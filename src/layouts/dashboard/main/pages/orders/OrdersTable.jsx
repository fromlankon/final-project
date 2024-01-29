import React, { useEffect, useState } from "react";
import { Select, Table } from "antd";
import moment from 'moment';
import { API } from "../../../../../config/axios";
import Loading from "../../../../site/main/components/Loading/Loading";
import { getBrands } from "../../../../../services/products";

export default function OrdersTable({ data, getOrders }) {

    const [infoModal, setInfoModal] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [singleProduct, setSingleProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);

    const getOrderData = (orderId) => {
        if (orderId) {
            API.get(`/dashboard/orders?page=1&perPage=999`)
                .then((res) => {
                    setOrderData(res.data.data.data);
                    setLoading(false);
                })
        }
    };

    const openInfoModal = (record) => {
        setLoading(true);
        setInfoModal(!infoModal);
        setSelectedOrderId(record?._id);
        getOrderData(record);
    };

    const singleOrderData = orderData?.find((item) => selectedOrderId === item._id);

    const getOrderDetails = async () => {
        if (!singleOrderData?.products || !Array.isArray(singleOrderData.products)) {
            return;
        }
        let newArr = singleOrderData.products.map((item) => {
            return API.get(`/site/products/${item.productId}`);
        });

        try {
            let resolvedData = await Promise.all(newArr);
            resolvedData = resolvedData.reduce((acc, item) => {
                acc[item.data.data._id] = item.data.data;
                return acc;
            }, {});
            setSingleProduct(resolvedData);
        } catch (error) {
            console.error("Error fetching product data", error);
        }
    };

    useEffect(() => {
        getBrands()
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (singleOrderData) {
            getOrderDetails();
        }
    }, [singleOrderData]);

    const handleChange = (value, record) => {
        API.put(`/dashboard/orders/${record._id}`, { status: value })
            .then((res) => {
                console.log(res);
                getOrders();
            }
            );
    };

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        getOrderData();
    }, [selectedOrderId]);

    const totalAmount = singleOrderData?.products?.reduce((total, item) => (
        total + (item.productCount * singleProduct[item.productId]?.salePrice)
    ), 0);

    const formattedDate = moment(singleOrderData?.createdAt).format('MMM DD, YYYY, HH:mm');
    const handlePaginationChange = () => window.scrollTo(0, 0);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('ordersInfoModalOverlay')) {
            openInfoModal();
        }
    };

    const columns = [
        {
            title: "CUSTOMER NAME",
            dataIndex: "customer",
            key: "customer",
            render: (customer) => <a> {customer.name} </a>,
            width: "25%"
        },
        {
            title: "CREATED DATE",
            key: "createdAt",
            dataIndex: "createdAt",
            render: (createdAt) => moment(createdAt).format('MMM DD, YYYY'),
            width: "17%"
        },
        {
            title: "PAYMENT METHOD",
            dataIndex: "method",
            key: "method",
            width: "17%"
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            render: (text) => (
                <span className={`
                ${text === "delivered" ? "deliveredClass" : ""}
                ${text === "pending" ? "pendingClass" : ""}
                ${text === "processing" ? "processingClass" : ""}
                ${text === "cancel" ? "cancelClass" : ""}
                `}>
                    {text}
                </span>
            ),
            width: "14%"
        },
        {
            title: "ACTIONS",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Select defaultValue={record.status} style={{ width: 120 }} onChange={(value) => handleChange(value, record)}
                    options={[
                        {
                            value: "delivered",
                            label: "Delivered",
                        },
                        {
                            value: "pending",
                            label: "Pending",
                        },
                        {
                            value: "processing",
                            label: "Processing",
                        },
                        {
                            value: "cancel",
                            label: "Cancel",
                        },
                    ]}
                />
            ),
            width: "14%"
        },
        {
            title: "INFORMATION",
            dataIndex: "information",
            key: "information",
            render: (text, record) =>
                <p className="ordersTableInfo" onClick={(e) => { openInfoModal(record) }}>
                    <i className="bi bi-info-lg"></i>
                </p>,
            width: "17%"
        },
    ];

    return (
        <div>
            <div className={`ordersInfoModalOverlay ${infoModal ? "toggle" : ""}`} onClick={handleOverlayClick}>
                {loading ? (<Loading />) : (
                    <div className="ordersInfoModal">
                        <i className="lni lni-close" onClick={openInfoModal}></i>
                        <div className="orderInfoTableMain">
                            <p> Customer Name: <span> {singleOrderData?.customer?.name} </span> </p>
                            <p> Created Date: <span> {formattedDate} </span> </p>
                        </div>
                        <div className="ordersInfoTable">
                            <div className="ordersInfoTableHeader">
                                <p className="ordersTableHeaderTitle"> PRODUCT NAME </p>
                                <p className="ordersTableHeaderBrand"> BRAND NAME </p>
                                <p className="ordersTableHeaderQuantity"> QUANTITY </p>
                                <p className="ordersTableHeaderPrice"> PRICE </p>
                                <p className="ordersTableHeaderAmount"> AMOUNT </p>
                            </div>
                            {singleOrderData?.products?.map((item, index) => (
                                <div key={item?._id} className="ordersInfoTableBody">
                                    <p className="ordersTableBodyTitle"> {index + 1}. {singleProduct[item.productId]?.title} </p>
                                    <p className="ordersTableBodyBrand"> {brands.find(brand => brand._id === singleProduct[item.productId]?.brandId)?.name} </p>
                                    <p className="ordersTableBodyQuantity"> {item?.productCount} </p>
                                    <p className="ordersTableBodyPrice"> ${singleProduct[item.productId]?.salePrice}.00 </p>
                                    <p className="ordersTableBodyAmount"> ${item?.productCount * singleProduct[item?.productId]?.salePrice}.00 </p>
                                </div>
                            ))}
                        </div>
                        <div className="ordersInfoModalFooter">
                            <div>
                                <p className="ordersText1"> PAYMENT METHOD </p>
                                <p className="ordersText2"> {singleOrderData?.method} </p>
                            </div>
                            <div>
                                <p className="ordersText1"> SHIPPING COST </p>
                                <p className="ordersText2"> $0.00 </p>
                            </div>
                            <div>
                                <p className="ordersText1"> DISCOUNT </p>
                                <p className="ordersText2"> $0.00 </p>
                            </div>
                            <div>
                                <p className="ordersText1"> TOTAL AMOUNT </p>
                                <p className="ordersText3"> ${totalAmount}.00 </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10, onChange: handlePaginationChange }} />
        </div>
    )
}