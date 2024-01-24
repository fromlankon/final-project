import React, { useContext, useEffect, useState } from 'react';
import { sidebarContext } from '../../../../../context/SidebarContext';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { BasketContext } from '../../../../../context/BasketContext';
import { UserContext } from '../../../../../context/AuthContext';

export default function Sidebar() {

    const { show, setShow } = useContext(sidebarContext);
    const { basket, deleteItem, basketProducts, backData} = useContext(BasketContext);
    const { user } = useContext(UserContext);

    return (
        <div className={`sidebarOverlay ${show ? "active" : ""}`} onClick={() => setShow(false)}>
            <div className={`sidebar ${show ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                <i className="fa-solid fa-xmark closeSidebar" onClick={() => setShow(false)}></i>
                {basket.length === 0 && basketProducts.length === 0 && (
                    <div className='emptyCart'>
                        <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/themes/nooni/images/cart-empty.svg" alt="Empty cart" />
                        <p> Your cart is currently empty </p>
                    </div>
                )}
                {(basket.length > 0 || basketProducts.length > 0) && (
                    <div className='sidebarHeader'>
                        <p> Cart ({user ? basketProducts.length : basket.length}) </p>
                    </div>
                )}
                {(basket.length > 0 || basketProducts.length > 0) && (
                    <div className='sidebarCardMain'>
                        {basketProducts.map(product => {
                            const item = basket.find((item) => item._id === product?._id);
                            return (
                                <div className='sidebarCard' key={product?._id}>
                                    <i className="fa-regular fa-trash-can deleteItem" onClick={() => user ? (backData.find(item => item.productId === product?._id) ?
                                        deleteItem(backData.find(item => item.productId === product?._id)?._id) : null) : deleteItem(product?._id)}></i>
                                    <div className='sidebarCardImage'>
                                        <img src={product?.images?.[0]?.url} />
                                    </div>
                                    <div className='sidebarCardData'>
                                        <div className='sidebarCardTitle'>
                                            {product?.title} ({user ? backData.find((c) => c.productId === product._id)?.productCount || 0
                                                : basket.find((e) => e._id === product._id)?.productCount})
                                        </div>
                                        <div className='sidebarCardDetails'>
                                            <p className='sidebarCardPrice'> ${product?.salePrice}.00 </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {(basket.length > 0 || basketProducts.length > 0) && (
                    <div className='sidebarFooter'>
                        <div className='cardSubtotal'>
                            <p> Subtotal </p>
                            <p>
                                ${basketProducts.reduce((acc, product) => {
                                    const item = user ? backData.find((e) => e.productId === product?._id) :
                                        basket.find((e) => e._id === product?._id);
                                    return acc + product?.salePrice * (item?.productCount || 0);
                                }, 0).toFixed(2)}
                            </p>
                        </div>
                        <div className='sidebarFooterButtons'>
                            <Link to={"/cart"} className='sidebarFooterButton1' onClick={() => setShow(false)}> VIEW CART </Link>
                            <Link to={"/checkout"} className='sidebarFooterButton2' onClick={() => setShow(false)}> CHECKOUT </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
