import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../main/components/Footer/Footer'
import Discount from '../main/components/Discount/Discount'
import Header from '../main/components/Header/Header'

export default function AuthLayout() {
  return (
    <>
      <Discount />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
