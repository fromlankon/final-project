import React from 'react'
import { Link } from 'react-router-dom'
import "./Dropdown.css"

export default function Dropdown3({ headerPadding, dropdownState, handleDropdownToggle }) {
    return (
        <li className={`headerLink ${headerPadding ? "padding" : ""}`} onMouseEnter={() => handleDropdownToggle('men', true)} onMouseLeave={() => handleDropdownToggle('men', false)}>
            <Link className='men'>
                <p> Men </p>
                <i className="fa-solid fa-chevron-down headerChev"></i>
            </Link>
            <div className={`dropdown ${dropdownState.men ? "show" : ""}`}>
                <div className='dropdownContainer dropdownRow'>
                    <div className='dropdown3'>
                        <div className='dropdownLinks'>
                            <div className='dropdownLinksMain'>
                                <Link className='dropdownMainText'> Men Clothings </Link>
                                <div className='dropdownLinksBottom'>
                                    <Link>
                                        <p className='dropdownSubText'> Men </p>
                                    </Link>
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
                                </div>
                            </div>
                            <div className='dropdownLinksMain'>
                                <Link className='dropdownMainText'> Shop by Activity </Link>
                                <div className='dropdownLinksBottom'>
                                    <Link>
                                        <p className='dropdownSubText'> Activities </p>
                                    </Link>
                                    <Link>
                                        <p className='dropdownSubText'> Back to School </p>
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
                                        <p className='dropdownSubText'> Vacation & Wedding </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='dropdown3img'>
                            <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-3-1.jpg" />
                        </div>
                    </div>
                    <div className='dropdown3bottomImg'>
                        <div className='dropdown3imageText'>
                            <p className='dropdownImageText1'> ENJOY FREE SHIPPING </p>
                            <p className='dropdownImageText3'> The Best </p>
                            <p className='dropdownImageText3'> Coats & Jackets </p>
                        </div>
                        <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-4-1.jpg" />
                    </div>
                </div>
            </div>
        </li>
    )
}
