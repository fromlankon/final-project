import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./Dropdown.css"
import { UserContext } from '../../../../../context/AuthContext'

export default function Dropdown4({ headerPadding, dropdownState, handleDropdownToggle }) {

    const { user } = useContext(UserContext);

    return (
        <li className={`kidsDropdown headerLink ${headerPadding ? "padding" : ""}`} onMouseEnter={() => handleDropdownToggle('kids', true)} onMouseLeave={() => handleDropdownToggle('kids', false)}>
            <Link className='kids'>
                <p> Pages </p>
                <i className="fa-solid fa-chevron-down headerChev"></i>
            </Link>
            <div className={`dropdown4 ${dropdownState.kids ? "show" : ""}`}>
                <Link to={"/home"}>
                    <p className='dropdown4link'> Home </p>
                </Link>
                <Link to={"/shop"}>
                    <p className='dropdown4link'> Shop </p>
                </Link>
                <Link to={"/cart"}>
                    <p className='dropdown4link'> Cart </p>
                </Link>
                <Link to={"/wishlist"}>
                    <p className='dropdown4link'> Wishlist </p>
                </Link>
                <Link to={"/checkout"}>
                    <p className='dropdown4link'> Checkout </p>
                </Link>
                <Link to={"/about"}>
                    <p className='dropdown4link'> About Us </p>
                </Link>
            </div>
        </li>
    )
}