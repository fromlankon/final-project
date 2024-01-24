import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Discount.css"

export default function Discount() {
    const [dropdownState, setDropdownState] = useState({
        language: false,
        currency: false,
    });

    const handleDropdownToggle = (dropdownName, isOpen) => {
        setDropdownState((prevState) => ({ ...prevState, [dropdownName]: isOpen, }));
    };

    return (
        <div className='discountPage'>
            <div className='discountPageMain'>
                <p className='discountPageText1'>
                    UP TO 40% OFF BEST-SELLING FURNITURE. <Link to={"/shop"} className='shopNow'>SHOP NOW </Link>
                </p>
                <div className='discountPageDropDown'>
                    <div className='language'>
                        ENGLISH <i className='fa-solid fa-chevron-down'></i>
                        <div className="languageDropDown">
                            <div> FRANÇAIS </div>
                            <div> DEUTSCH </div>
                        </div>
                    </div>
                    <div className='currency'>
                        USD <i className='fa-solid fa-chevron-down'></i>
                        <div className="currencyDropDown">
                            <div> USD </div>
                            <div> EUR </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
