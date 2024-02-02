import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Discount from './components/Discount/Discount'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default function MainLayout() {

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Discount />
      <Header />
      <div className={`headerAnimation ${isHeaderFixed ? "scroll" : ""}`}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  )
}