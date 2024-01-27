import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../CSS/Checkout.css"
import { BasketContext } from '../../../../context/BasketContext'
import { countries } from '../../../../../mockData'
import { UserContext } from '../../../../context/AuthContext'
import { API } from '../../../../config/axios'

export default function Checkout() {

    const { basketProducts, setBasketProducts, backData } = useContext(BasketContext);
    const { user } = useContext(UserContext)
    const [couponAccordion, setCouponAccordion] = useState(false);
    const [countryAccordion, setCountryAccordion] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setCountryAccordion(!countryAccordion);
    };

    const addOrder = (e) => {
        e.preventDefault();
        const orderData = {
            products: backData.map((item) => ({
                productId: item.productId,
                productCount: item.productCount,
            })),
        };

        API.post("/site/orders", orderData)
            .then((res) => {
                console.log(res);
                backData.map((item) => {
                    API.delete(`/site/basket/${item._id}`);
                });
                setBasketProducts([]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='checkout'>
            <div className="checkoutContainer">
                <div className="checkoutLocation">
                    <Link to={"/home"} className='checkoutText1'> Home </Link>
                    <p className='checkoutText2'> / </p>
                    <p className='checkoutText2'> Checkout </p>
                </div>
                {basketProducts.length === 0 && (
                    <div className='emptyCheckout'>
                        <p className='emptyCheckoutText1'> Checkout is not available whilst your cart is empty. </p>
                        <div>
                            <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/themes/nooni/images/cart-empty.svg" />
                            <p className='checkoutText3'> Your cart is currently empty. </p>
                        </div>
                        <Link to={"/shop"} className='emptyCheckoutButton'> RETURN TO SHOP </Link>
                    </div>
                )}
                {basketProducts.length > 0 && (
                    <div className="checkoutMain">
                        <div className='checkoutTop'>
                            <div className='checkoutCoupon'>
                                <p className='checkoutText3'> Have a coupon? </p>
                                <span onClick={() => setCouponAccordion(!couponAccordion)}> Click here to enter your code </span>
                            </div>
                            <div className={`checkoutCouponSettings ${couponAccordion ? "scale" : ""}`}>
                                <p className='checkoutText2'> If you have a coupon code, please apply it below. </p>
                                <div>
                                    <input type="text" placeholder='Coupon code' />
                                    <button> APPLY COUPON </button>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={addOrder} className="checkoutBottom">
                            <div className="checkoutBottomLeft">
                                <p className='checkoutText4'> BILLING DETAILS </p>
                                <div className="checkoutBottomLeftNameInputs">
                                    <div>
                                        <label htmlFor="firstname"> First name <span> * </span> </label>
                                        <input value={user.name} type="text" id='firstname' />
                                    </div>
                                    <div>
                                        <label htmlFor="lastname"> Last name <span> * </span> </label>
                                        <input value={user.surname} type="text" id='lastname' />
                                    </div>
                                </div>
                                <div className="checkoutBottomEmail">
                                    <label htmlFor="checkoutemail"> Email adress <span> * </span> </label>
                                    <input value={user.email} type="email" id='checkoutemail' />
                                </div>
                                <div className="checkoutBottomLeftCountryInput">
                                    <label htmlFor=""> Country / Region <span> * </span> </label>
                                    <div className='selectCountry' onClick={() => setCountryAccordion(!countryAccordion)}>
                                        {selectedCountry ? selectedCountry.name : "Select a country"} <i className="bi bi-chevron-down"></i>
                                        <div className={`chooseCountry ${countryAccordion ? "opacity" : ""}`}>
                                            {countries.map(country => (
                                                <p key={country.id} onClick={() => handleCountryClick(country)}> {country.name} </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="checkoutBottomLeftStreetAdress">
                                    <label htmlFor="streetadress"> Street adress <span> * </span> </label>
                                    <div>
                                        <input type="text" id='streetadress' placeholder='House number and street name' />
                                        <input type="text" placeholder='Apartment, suite, unit, etc. (optional)' />
                                    </div>
                                </div>
                                <div className="checkoutBottomLeftPostcode">
                                    <label htmlFor="postcode"> Postcode / ZIP <span> * </span> </label>
                                    <input type="text" id='postcode' />
                                </div>
                                <div className="checkoutBottomTown">
                                    <label htmlFor="towncity"> Town / City <span> * </span> </label>
                                    <input type="text" id='towncity' />
                                </div>
                                <div className="checkoutBottomPhone">
                                    <label htmlFor="checkoutphone"> Phone <span> * </span> </label>
                                    <input type="text" id='checkoutphone' />
                                </div>
                                <div className="checkoutBottomNotes">
                                    <label htmlFor="ordernotes"> Order notes (optional) </label>
                                    <textarea type="text" id='ordernotes' placeholder='Notes about your order, e.g. special notes for delivery.' />
                                </div>
                            </div>
                            <div className="checkoutBottomRight">
                                <div className="checkoutBottomRight1">
                                    <p className='checkoutText4'> YOUR ORDER </p>
                                    <div>
                                        <p className='checkoutText6'> Product </p>
                                        <p className='checkoutText6'> Price </p>
                                    </div>
                                </div>
                                <div className="checkoutBottomRight2">
                                    {basketProducts.map((product) => (
                                        <div className="checkoutBottomRight2Main">
                                            <p className='checkoutBottomRight2Title checkoutText7'> {product.title} ({backData.find((e) => e.productId === product._id)?.productCount || 0}) </p>
                                            <p className='checkoutBottomRight2Price checkoutText6'>
                                                ${product.salePrice * (backData.find((e) => e.productId === product._id)?.productCount || 0)}.00
                                            </p>
                                        </div>
                                    )
                                    )}
                                </div>
                                <div className="checkoutBottomRight3">
                                    <p className='checkoutText6'> Subtotal </p>
                                    <p className='checkoutText6'>
                                        ${basketProducts.reduce((acc, product) => {
                                            const item = backData.find((e) => e.productId === product._id);
                                            return acc + product.salePrice * (item?.productCount || 0);
                                        }, 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className="checkoutBottomRight6">
                                    <button> PLACE ORDER </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
