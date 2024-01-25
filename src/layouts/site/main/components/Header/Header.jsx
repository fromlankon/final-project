import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
import Sidebar from '../Sidebar/Sidebar';
import { BasketContext } from '../../../../../context/BasketContext';
import { sidebarContext } from '../../../../../context/SidebarContext';
import { WishlistContext } from '../../../../../context/WishlistContext';
import SearchBar from '../SearchBar/SearchBar';
import Hamburger from '../Hamburger/Hamburger';
import Dropdown1 from '../Dropdown/Dropdown1';
import Dropdown2 from '../Dropdown/Dropdown2';
import Dropdown3 from '../Dropdown/Dropdown3';
import Dropdown4 from '../Dropdown/Dropdown4';
import { UserContext } from '../../../../../context/AuthContext';

export default function Header() {

    const { basket, basketProducts } = useContext(BasketContext);
    const { wishlist } = useContext(WishlistContext);
    const { show, setShow } = useContext(sidebarContext);
    const { user } = useContext(UserContext);
    const [openHamburger, setOpenHamburger] = useState(false);
    const [login, setLogin] = useState(false);
    const [headerPadding, setHeaderPadding] = useState(false);
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const navigate = useNavigate();
    const userBlock = useRef(null);

    const toggleUserBlock = () => {
        setLogin((prevVisible) => !prevVisible);
    };

    const closeUserBlock = (e) => {
        if (userBlock.current && !userBlock.current.contains(e.target)) {
            setLogin(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeUserBlock);
        return () => {
            document.removeEventListener("click", closeUserBlock);
        };
    }, []);

    const closeHamburger = () => {
        setOpenHamburger(!openHamburger);
    };

    const [dropdownState, setDropdownState] = useState({
        shop: false,
        women: false,
        men: false,
        kids: false
    });

    const handleDropdownToggle = (dropdownName, isOpen) => {
        setDropdownState((prevState) => ({
            ...prevState, [dropdownName]: isOpen
        }));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setHeaderPadding(true);
            } else {
                setHeaderPadding(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const searchBarToggle = () => {
        setOpenSearchBar(!openSearchBar);
    };

    const logOut = () => {
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate("/home");
            window.location.reload();
        }, 1000);
    };

    return (
        <>
            <SearchBar openSearchBar={openSearchBar} setOpenSearchBar={setOpenSearchBar} searchBarToggle={searchBarToggle} />
            <Sidebar />
            <Hamburger openHamburger={openHamburger} setOpenHamburger={setOpenHamburger} />
            <div className="header">
                <div className='headerMain'>
                    <ul>
                        <Dropdown1 headerPadding={headerPadding} dropdownState={dropdownState} setDropdownState={setDropdownState} handleDropdownToggle={handleDropdownToggle} />
                        <Dropdown2 headerPadding={headerPadding} dropdownState={dropdownState} setDropdownState={setDropdownState} handleDropdownToggle={handleDropdownToggle} />
                        <Dropdown3 headerPadding={headerPadding} dropdownState={dropdownState} setDropdownState={setDropdownState} handleDropdownToggle={handleDropdownToggle} />
                        <Dropdown4 headerPadding={headerPadding} dropdownState={dropdownState} setDropdownState={setDropdownState} handleDropdownToggle={handleDropdownToggle} />
                    </ul>
                    <div id='logo'>
                        <Link to={"/home"}>
                            <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/themes/nooni/images/logo.png" />
                        </Link>
                    </div>
                    <div className='headerRight'>
                        <div className="searchIcon" onClick={() => searchBarToggle()}>
                            <img src="../../../../../src/images/Search.png" />
                        </div>
                        <div className="userIcon" onClick={toggleUserBlock} ref={userBlock}>
                            <img src="../../../../../src/images/User.png" />
                            <div className={`loginDropdown ${login ? "flex" : ""}`}>
                                {!user ? (<Link to={"/login"} className='loginContent'>
                                    <div className='loginDropdownImage'>
                                        <img src="../../../../../src/images/User.png" />
                                    </div>
                                    <p> Login </p>
                                </Link>) : null}
                                {!user ? (<Link to={"/register"} className='loginContent'>
                                    <div className='loginDropdownImage'>
                                        <img src="../../../../../src/images/Sign Up.png" />
                                    </div>
                                    <p> Register </p>
                                </Link>) : null}
                                {user ? (
                                    <div onClick={logOut} className='loginDropdownUserEmail loginContent'>
                                        <div className='loginDropdownImage'>
                                            <img src="../../../../../src/images/Log Out.png" />
                                        </div>
                                        <p> Log Out </p>
                                    </div>
                                ) : null}
                                {user ? (<p className='headerUserEmail'> {user.email} </p>) : null}
                            </div>
                        </div>
                        <Link to={"/wishlist"}>
                            <div className="wishlistIcon">
                                <span> {wishlist.length} </span>
                                <img src="../../../../../src/images/Heart.png" />
                            </div>
                        </Link>
                        <div className='cartIcon' onClick={() => setShow(!show)}>
                            <span> {user ? basketProducts.length : basket.length} </span>
                            <img src="../../../../../src/images/Cart.png" />
                        </div>
                    </div>
                    <div className="bar" onClick={() => closeHamburger()}>
                        <img src="../../../../../src/images/Hamburger.png" />
                    </div>
                </div>
            </div>
        </>
    )
}