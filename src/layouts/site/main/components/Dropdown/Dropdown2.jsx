import React from 'react'
import { Link } from 'react-router-dom'
import "./Dropdown.css"

export default function Dropdown2({ headerPadding, dropdownState, handleDropdownToggle }) {
    return (
        <li className={`headerLink ${headerPadding ? "padding" : ""}`} onMouseEnter={() => handleDropdownToggle('women', true)} onMouseLeave={() => handleDropdownToggle('women', false)}>
            <Link className='women'>
                <p> Women </p>
                <i className="fa-solid fa-chevron-down headerChev"></i>
            </Link>
            <div className={`dropdown ${dropdownState.women ? "show" : ""}`}>
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
                    <div className='dropdownLinks'>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Shop by Body Fit </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> Curve & Plus Size </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Maternity </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Petite </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Tall </p>
                                </Link>
                            </div>
                        </div>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Top Trendings </Link>
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
                            </div>
                        </div>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> Fashion Style </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> 18th Century </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> 19th Century </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> 20th Century </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> 21th Century </p>
                                </Link>
                            </div>
                        </div>
                        <div className='dropdownLinksMain'>
                            <Link className='dropdownMainText'> New In </Link>
                            <div className='dropdownLinksBottom'>
                                <Link>
                                    <p className='dropdownSubText'> Coats & Jackets </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Dresses </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Hoodies & Sweatshirts </p>
                                </Link>
                                <Link>
                                    <p className='dropdownSubText'> Jeans </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
