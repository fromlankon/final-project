import React, { useEffect, useState } from 'react';
import './Products.css';
import ProductsAddModal from './ProductsAddModal';
import ProductsTable from './ProductsTable';
import { API } from '../../../../../config/axios';

export default function Products() {
  const [productsModal, setProductsModal] = useState(false);

  const productsModalOpen = () => {
    setProductsModal(!productsModal);
  };

  const [products, setProducts] = useState({ data: [] });

  const getProducts = () => {
    const page = 1;
    const perPage = 40;
    const url = `/dashboard/products?page=${page}&perPage=${perPage}`;
    API.get(url)
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='productsMain'>
      <div className='productsOptions'>
        <button className='productsButtonMain' onClick={productsModalOpen}>
          <i className='fa-solid fa-plus'></i> Add Product
        </button>
      </div>
      <ProductsAddModal productsModalOpen={productsModalOpen} productsModal={productsModal} getProducts={getProducts} />
      <ProductsTable data={products.product} getProducts={getProducts} />
    </div>
  );
}