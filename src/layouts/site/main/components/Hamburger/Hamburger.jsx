import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from '../../../../../context/BasketContext'
import { WishlistContext } from '../../../../../context/WishlistContext'
import "../Hamburger/Hamburger.css"
import { sidebarContext } from '../../../../../context/SidebarContext'

export default function Hamburger({openHamburger, setOpenHamburger, searchBarToggle}) {

    const { basket } = useContext(BasketContext)
    const { wishlist } = useContext(WishlistContext)
    const { show, setShow } = useContext(sidebarContext)

    return (
        <div className={`hamburgerMenuOverlay ${openHamburger ? "active" : ""}`} onClick={() => setOpenHamburger(false)}>
            <div className={`hamburgerMenu ${openHamburger ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="hamburgerMenuHeader">
                    <div className="hamburgerMenuHeaderLeft">
                        <img src="../../../../../src/images/Hamburger White.png" />
                        <p> MENU </p>
                    </div>
                    <div className="hamburgerMenuHeaderRight">
                        <img src="../../../../../src/images/Category.png" />
                        <p> CATEGORIES </p>
                    </div>
                </div>
                <div className="hamburgerMenuBody">
                    <i className="fa-solid fa-xmark closeHamburgerMenu" onClick={() => setOpenHamburger(false)}></i>
                    <Link to={"/home"} style={{ color: "red" }}> Home </Link>
                    <Link to={"/shop"} style={{ color: "black" }}> Shop </Link>
                    <Link to={"/cart"} style={{ color: "black" }}> Cart </Link>
                    <Link to={"/wishlist"} style={{ color: "black" }}> Wishlist </Link>
                    <Link to={"/checkout"} style={{ color: "black" }}> Checkout </Link>
                    <Link to={"/about"} style={{ color: "black" }}> About us </Link>
                </div>
                <div className="support">
                    <Link>
                        <div className="searchIcon">
                            <img src="../../../../../src/images/Search.png" onClick={searchBarToggle} />
                        </div>
                    </Link>
                    <Link to={"/login"}>
                        <div className="userIcon" title='Login'>
                            <img src="../../../../../src/images/User.png" />
                        </div>
                    </Link>
                    <Link to={"/wishlist"}>
                        <div className="wishlistIcon" title='Wishlist'>
                            <span> {wishlist.length} </span>
                            <img src="../../../../../src/images/Heart.png" />
                        </div>
                    </Link>
                    <div className='cartIcon' title='Cart' onClick={() => setShow(!show)}>
                        <span> {basket.length} </span>
                        <img src="../../../../../src/images/Cart.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}
