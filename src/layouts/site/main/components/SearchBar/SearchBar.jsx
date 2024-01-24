import React, { useContext, useRef } from 'react'
import "../SearchBar/SearchBar.css"
import { sidebarContext } from '../../../../../context/SidebarContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ openSearchBar, setOpenSearchBar, searchBarToggle }) {

    const { setQuery } = useContext(sidebarContext);
    const navigate = useNavigate()
    const input = useRef(null);

    const handleSubmit = (e) => {
        searchBarToggle()
        e.preventDefault();
        const query = input.current.value;
        navigate(`/shop?query=${query}`);
        setQuery(query);
        
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('.searchBarOverlay')) {
            searchBarToggle();
        }
    };

    return (
        <div className={`searchBarOverlay ${openSearchBar ? "active" : ""}`} onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className={`searchBar ${openSearchBar ? "active" : ""}`}>
                <div className='searchBarText'>
                    <p> Search for products </p>
                    <i className="lni lni-close" onClick={searchBarToggle}></i>
                </div>
                <div className='searchBarSearchInput'>
                    <input ref={input} type="text" placeholder='Search for products...' />
                    <button type='submit'>
                        <img src="../../../../../src/images/Search.png" />
                    </button>
                </div>
            </form>
        </div>
    )
}
