import React, { useEffect, useState } from 'react';
import "./Brands.css";
import BrandsTable from './BrandsTable';
import BrandsAddModal from './BrandsAddModal';
import { API } from '../../../../../config/axios';

export default function Brands() {

  const [brandsModal, setBrandsModal] = useState(false);

  const brandsModalOpen = () => {
    setBrandsModal(!brandsModal);
  };

  const [brands, setBrands] = useState({ data: [] });

  const getBrands = () => {
    API.get("/dashboard/brands")
      .then((res) => {
        setBrands(res.data);
      })
      .catch ((err) => {
        console.error(err)
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className='brandsMain'>
      <div className='brandsOptions'>
        <button className='brandsButtonMain' onClick={brandsModalOpen}> <i className="fa-solid fa-plus"></i> Add brand </button>
      </div>
      <BrandsAddModal brandsModalOpen={brandsModalOpen} brandsModal={brandsModal} getBrands={getBrands} />
      <BrandsTable data={brands.data} getBrands={getBrands} />
    </div>
  );
}