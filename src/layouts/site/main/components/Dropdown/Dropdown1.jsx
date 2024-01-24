import React from 'react'
import { Link } from 'react-router-dom'
import "./Dropdown.css"

export default function Dropdown1({ headerPadding, dropdownState, handleDropdownToggle }) {
    return (
        <li className={`headerLink ${headerPadding ? "padding" : ""}`} onMouseEnter={() => handleDropdownToggle('shop', true)} onMouseLeave={() => handleDropdownToggle('shop', false)}>
            <Link className='shop'>
                <p> Shop </p>
                <i className="fa-solid fa-chevron-down headerChev"></i>
            </Link>
            <div className={`dropdown ${dropdownState.shop ? "show" : ""}`}>
                <div className='dropdownContainer'>
                    <div className='dropdownLinks'>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Women Clothings </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> Women </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Coats & Jackets </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Dresses </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Hodies & Sweatshirts </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Jeans </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Knitwears </p>
                                </Link>
                            </div>
                        </div>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Men Clothings </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> Coats & Jackets </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Hoodies </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Pants </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Shirts </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Shorts </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> T-Shirts </p>
                                </Link>
                            </div>
                        </div>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Shop by Collections </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> Fall Collection </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Pastel Collection </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Spring Collection </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Summer Collection </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Vintage Collection </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Winter Collection </p>
                                </Link>
                            </div>
                        </div>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Shop By Activity </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> Shop By Activity </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Casual Clothings </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Sport Clothings </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Summer Clothings </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Sport Clothings </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Work Clothings </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='dropdownImages'>
                        <div className='dropdownImageLeft'>
                            <div className='dropdownImageText'>
                                <p className='dropdownImageText1'> NEW PRODUCTS </p>
                                <p className='dropdownImageText2'> The Best Collections </p>
                            </div>
                            <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-1-2.jpg" />
                        </div>
                        <div className='dropdownImageRight'>
                            <div className='dropdownImageText'>
                                <p className='dropdownImageText1'> ENJOY FREE SHIPPING </p>
                                <p className='dropdownImageText2'> Men Pick From $15 </p>
                            </div>
                            <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-2-2.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
