import React, { useEffect, useRef, useState } from 'react';
import './Products.css';
import ProductsAddModal from './ProductsAddModal';
import ProductsTable from './ProductsTable';
import { API } from '../../../../../config/axios';

export default function Products() {

  const [products, setProducts] = useState({ data: [] });
  const [productsModal, setProductsModal] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef(null);

  const productsModalOpen = () => {
    setProductsModal(!productsModal);
  };

  const getProducts = (searchQuery = "") => {
    const page = 1;
    const perPage = 999;
    const search = searchQuery;
    const url = `/dashboard/products?page=${page}&perPage=${perPage}&search=${search}`;

    API.get(url)
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getProducts(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = input.current.value;
    setQuery(searchQuery);
  };

  return (
    <div className='productsMain'>
      <div className='productsOptions'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Search by product name' ref={input} />
          <button> <i className="lni lni-search-alt"></i> </button>
        </form>
        <button className='productsButtonMain' type='submit' onClick={productsModalOpen}>
          <i className='fa-solid fa-plus'></i> Add Product
        </button>
      </div>
      <ProductsAddModal productsModalOpen={productsModalOpen} productsModal={productsModal} getProducts={getProducts} />
      <ProductsTable data={products.product} getProducts={getProducts} />
    </div>
  );
}