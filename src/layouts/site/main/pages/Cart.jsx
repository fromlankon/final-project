import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from '../../../../context/BasketContext'
import "../CSS/Cart.css"
import { API } from '../../../../config/axios';
import { UserContext } from '../../../../context/AuthContext';

export default function Cart() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { basket, setBasket, deleteItem, basketProducts, backData, increase, decrease } = useContext(BasketContext);
    const { user } = useContext(UserContext);

    const updateCart = () => {
        const updateRequests = backData.map((item) => {
            return API.put(`/site/basket/${item._id}`, { productCount: item.productCount });
        });
        Promise.all(updateRequests)
            .then((responses) => {
                console.log(responses);
            })
            .catch((error) => {
                console.error("Error updating card:", error);
            });
    };

    const emptyCart = () => {
        if (user) {
            backData.forEach((item) => {
                deleteItem(item._id);
            });
            scrollTo(0, 0);
        } else {
            setBasket([]);
        }
    };

    return (
        <div className='cart'>
            <div className="cartContainer">
                <div className="cartLocation">
                    <Link to={"/home"} className='cartText1'> Home </Link>
                    <p className='cartText2'> / </p>
                    <p className='cartText2'> Shopping Cart </p>
                </div>
                {(basket.length === 0 && backData.length === 0) && (
                    <div className="emptyShoppingCart">
                        <div>
                            <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/themes/nooni/images/cart-empty.svg" />
                            <p className='cartText7'> Your cart is currently empty. </p>
                        </div>
                        <Link to={"/shop"} className='cartButton3'> RETURN TO SHOP </Link>
                    </div>
                )}
                {(basket.length > 0 || backData.length > 0) && (
                    <div className="cartMain">
                        <div className="cartMainLeft">
                            <div className="cartHeader">
                                <div className='cartProduct'> Product </div>
                                <div className='cartPrice'> Price </div>
                                <div className='cartQuantity'> Quantity </div>
                                <div className='cartSubtotal'> Subtotal </div>
                            </div>
                            {basketProducts.map(product => (
                                <div className="cartBody" key={product?._id}>
                                    <div className='cartBodyData1'>
                                        <div className='cartImage'>
                                            <div> <img src={product?.images?.[0]?.url} /> </div>
                                        </div>
                                        <div className='cartTitle' to={"/home/detail"}> {product?.title} </div>
                                    </div>
                                    <div className='cartBodyData2'>
                                        <p className='cartNewPrice'> ${product?.salePrice}.00 </p>
                                    </div>
                                    <div className='cartBodyData3'>
                                        <div className='cartDecrease' onClick={() => decrease(product?._id)}> - </div>
                                        <div className='cartQuantity'>
                                            {user ? backData.find((c) => c.productId === product._id)?.productCount || 0
                                                : basket.find((e) => e._id === product._id)?.productCount}
                                        </div>
                                        <div className='cartIncrease' onClick={() => increase(product?._id)}> + </div>
                                    </div>
                                    <div className='cartBodyData4'>
                                        <p> ${user
                                            ? product.salePrice *
                                            (backData.find((e) => e.productId === product._id)
                                                ?.productCount || 0)
                                            : product.salePrice *
                                            basket.find((c) => c._id === product._id)?.productCount}
                                            .00</p>
                                        <i className="fa-regular fa-trash-can" onClick={() => user ? (backData.find(item => item.productId === product?._id) ?
                                            deleteItem(backData.find(item => item.productId === product?._id)?._id) : null) : deleteItem(product?._id)}></i>
                                    </div>
                                </div>
                            )
                            )}
                            {basketProducts.map(product => (
                                <div className="cartBody-2" key={product?._id}>
                                    <div className='cartBodyData1-2'>
                                        <div className='cartImage'>
                                            <div> <img src={product?.images?.[0].url} /> </div>
                                        </div>
                                        <div className='cartTitle'> {product?.title} </div>
                                        <i className="fa-regular fa-trash-can" onClick={() => user ? (backData.find(item => item.productId === product?._id) ?
                                            deleteItem(backData.find(item => item.productId === product?._id)?._id) : null) : deleteItem(product?._id)}></i>
                                    </div>
                                    <div className='cartBodyData2-2'>
                                        <p className='cartBody-2-text'> Price: </p>
                                        <p className='cartNewPrice'> ${product?.salePrice}.00 </p>
                                    </div>
                                    <div className='cartBodyData3-2'>
                                        <p className='cartBody-2-text'> Quantity: </p>
                                        <div className='cartBody-2-quantity'>
                                            <div className='cartDecrease' onClick={() => decrease(product?._id)}> - </div>
                                            <div className='cartQuantity'>
                                                {user ? backData.find((c) => c.productId === product._id)?.productCount || 0
                                                    : basket.find((e) => e._id === product._id)?.productCount}
                                            </div>
                                            <div className='cartIncrease' onClick={() => increase(product?._id)}> + </div>
                                        </div>
                                    </div>
                                    <div className='cartBodyData4-2'>
                                        <p className='cartBody-2-text'> Subtotal: </p>
                                        <p className='cartBody-2-text-2'>
                                            {user ? product.salePrice * (backData.find((e) => e.productId === product._id)
                                                ?.productCount || 0) : product.productPrice *
                                            basket.find((c) => c._id === product._id)?.productCount}.00$
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="cartFooter">
                                <div className='cartCoupon'>
                                    <input type="text" placeholder='Coupon code' />
                                    <button> APPLY COUPON </button>
                                </div>
                                <div className='cartFooterButtons'>
                                    <button className='cartFooterButton1' onClick={() => emptyCart()}> EMPTY CART </button>
                                    <button className='cartFooterButton2' onClick={() => { updateCart(); scrollTo(0, 0) }}> UPDATE CART </button>
                                </div>
                            </div>
                        </div>
                        <div className="cartMainRight">
                            <p className='cartText3'> CART TOTALS </p>
                            <div>
                                <p className='cartText4 cartText4hidden'> Subtotal </p>
                                <p className='cartText4-2'> Subtotal: </p>
                                <p className='cartText5'>
                                    ${basketProducts.reduce((acc, product) => {
                                        const item = user ? backData.find((e) => e.productId === product?._id) :
                                            basket.find((e) => e._id === product?._id);
                                        return acc + product?.salePrice * (item?.productCount || 0);
                                    }, 0).toFixed(2)}
                                </p>
                            </div>
                            <Link to={"/checkout"} className='cartCheckoutButton'> PROCEED TO CHECKOUT </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}