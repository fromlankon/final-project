import React, { useEffect, useState } from "react";
import { API } from "../../../../../config/axios";
import OrdersTable from "./OrdersTable";
import "./Orders.css"

export default function Orders() {

  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    const page = 1;
    const perPage = 999;
    
    API.get(`/dashboard/orders?page=${page}&perPage=${perPage}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <OrdersTable getOrders={getOrders} data={orders.data} orders={orders} />
    </>
  );
}