import React, { useEffect, useRef, useState } from "react";
import { API } from "../../../../../config/axios";
import OrdersTable from "./OrdersTable";
import { Select } from 'antd';
import "./Orders.css"

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const input = useRef(null);

  const getOrders = () => {
    const page = 1;
    const perPage = 999;

    API.get(`/dashboard/orders?page=${page}&perPage=${perPage}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.error(err)
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(input.current.value);
  };

  const handleChange = (value) => {
    setSelectedStatus(value);
  };

  const filterOrdersByStatus = (orders, status) => {
    if (status === "") {
      return orders;
    } else {
      return orders.filter(order => order.status === status);
    }
  };

  const handleReset = () => {
    setQuery("");
    setSelectedStatus("");
    input.current.value = "";
  };

  return (
    <div className="ordersMain">
      <form className='ordersOptions' onSubmit={handleSubmit}>
        <div className="ordersFilterBlock">
          <input className="ordersCustomerNameFilter" type="text" placeholder="Search by customer name" ref={input} />
          <Select className="ordersStatusFilter" defaultValue="Order status"
            onChange={handleChange}
            options={[
              { value: 'delivered', label: 'Delivered' },
              { value: 'pending', label: 'Pending' },
              { value: 'processing', label: 'Processing' },
              { value: 'cancel', label: 'Cancel' }
            ]} />
          <Select className="ordersStatusFilter" defaultValue="Payment method"
            options={[{ value: 'card', label: 'Card' }]} />
        </div>
        <div className="ordersFilterButtons">
          <button className="ordersResetButton" type="button" onClick={handleReset}> Reset </button>
          <button className='ordersFilterButton' type="submit"> Filter </button>
        </div>
      </form>
      <OrdersTable getOrders={getOrders} data={filterOrdersByStatus(orders?.data?.filter(item =>
        item?.customer?.name.toLowerCase().includes(query.toLowerCase())), selectedStatus)} orders={orders} />
    </div>
  );
}