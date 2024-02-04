import React, { useContext, useEffect, useState } from 'react'
import "../CSS/Shop.css"
import { Link, useLocation } from 'react-router-dom'
import { BasketContext } from '../../../../context/BasketContext'
import { WishlistContext } from '../../../../context/WishlistContext'
import DetailsModal from '../components/DetailsModal/DetailsModal'
import { sidebarContext } from '../../../../context/SidebarContext'
import { getBrands, getProducts } from '../../../../services/products'
import SearchBar from '../components/SearchBar/SearchBar'
import { Slider } from 'antd';
import { API } from '../../../../config/axios'

export default function Shop() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { addToBasket } = useContext(BasketContext);
    const { addToWishlist, isInWishlist, wishlistIcon, setWishlistIcon } = useContext(WishlistContext);
    const { setShow, query } = useContext(sidebarContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [oldData, setoldData] = useState([]);
    const [openSort, setOpenSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState("");
    const [sort, setSort] = useState('asc');
    const [currentIndex, setCurrentIndex] = useState(1);
    const productsPerPage = 12;
    const maxPageCount = Math.ceil(products.length / productsPerPage);
    const minPrice = Math.min(...products.map(data => data.salePrice));
    const maxPrice = Math.max(...products.map(data => data.salePrice));
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [brands, setBrands] = useState([]);
    const [saleProducts, setSaleProducts] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [filterBar, setFilterBar] = useState(false);
    const location = useLocation();

    const filterBarToggle = () => {
        setFilterBar(!filterBar)
    }

    useEffect(() => {
        Promise.all([getProducts(), getBrands()])
            .then(([productsRes, brandsRes]) => {
                setProducts(productsRes.data.product || []);
                setBrands(brandsRes.data || []);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleBrandChange = (brandId) => {
        const updatedBrands = selectedBrands.includes(brandId)
            ? selectedBrands.filter((id) => id !== brandId)
            : [...selectedBrands, brandId];

        setSelectedBrands(updatedBrands);
    };

    const filteredProducts = products
        .filter((product) => {
            return (
                (saleProducts ? product.stock > 0 : true) &&
                (selectedBrands.length === 0 || selectedBrands.includes(product.brandId))
            );
        })
        .slice((currentIndex - 1) * productsPerPage, currentIndex * productsPerPage);

    const saleChange = () => {
        setSaleProducts(!saleProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getFilteredProducts({ minPrice: priceRange[0], maxPrice: priceRange[1] });
    };

    const handleRangeChange = (value) => {
        setPriceRange(value);
    };

    const getFilteredProducts = async (filters) => {
        try {
            let res = await getProducts(filters);
            setProducts(res.data.product || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('filterBarOverlay') && filterBar) {
            filterBarToggle();
        }
    };

    const paginationButtons = [];
    const maxButtonsToShow = 3;
    const startPage = Math.max(1, Math.min(currentIndex - Math.floor(maxButtonsToShow / 2), maxPageCount - maxButtonsToShow + 1));
    const endPage = Math.min(startPage + maxButtonsToShow - 1, maxPageCount);
    for (let i = startPage; i <= endPage; ++i) {
        paginationButtons.push(
            <button key={i} disabled={currentIndex === i} className={`paginationButton ${currentIndex === i && "activeButton"}`}
                onClick={() => {
                    setCurrentIndex(i);
                    window.scrollTo(0, 0);
                }} > {i} </button>);
    }

    const openModal = (data) => {
        setModalData({ data, brandId: data.brandId });
        setModalOpen(!modalOpen);
    }

    const productDetails = (_id) => {
        API.get(`/site/products/${_id}`)
            .then((res) => {
                setModalData(res.data)
            })
    }

    const getBrandName = (brandId) => {
        const brand = brands.find(brand => brand._id === brandId);
        return brand ? brand.name : "";
    };

    const addToBasketAndOpenSidebar = (data) => {
        addToBasket(data);
        setShow(true);
    };

    const handleSortChange = (value) => {
        setSelectedSort(value);
        switch (value) {
            case " by price":
                sortByPrice();
                break;
            case " by name":
                sortByTitle();
                break;
            default:
                break;
        }
    };

    const sortByPrice = () => {
        const sortArr = [...products];
        if (sort === 'asc') {
            sortArr.sort((b, a) => b.salePrice - a.salePrice);
            setSort('desc');
        } else {
            sortArr.sort((b, a) => a.salePrice - b.salePrice);
            setSort('asc');
        }
        setProducts(sortArr);
    };

    const sortByTitle = () => {
        const sortArr = [...products]
        if (sort === "asc") {
            sortArr.sort((b, a) => {
                return b.title.localeCompare(a.title)
            })
            setSort("desc")
        } else {
            sortArr.sort((b, a) => {
                return a.title.localeCompare(b.title)
            })
            setSort("asc")
        }
        setProducts(sortArr)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsRes = await getProducts();
                setProducts(productsRes.data.product || []);
                setoldData(productsRes.data.product || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setProducts(
            oldData.filter((item) => {
                if (item.title.toLowerCase().includes(query.toLowerCase())) {
                    return item;
                }
            })
        );
    }, [query]);

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get("query");
        if (searchQuery) {
            const filteredProducts = oldData.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
        } else {
            setProducts(oldData);
        }
    }, [location.search, oldData]);

    return (
        <div>
            <SearchBar />
            <div className='shopPage'>
                <div className="shopContainer">
                    <div className='shopLocation'>
                        <Link to={"/home"} className='shopText1'> Home </Link>
                        <p className='shopText2'> / </p>
                        <p className='shopText2'> Shop </p>
                    </div>
                    <div className="shopMain">
                        <form onSubmit={handleSubmit} className="shopOptions">
                            <div className="brandOptions">
                                <div className="brandOptionsHeader"> BRANDS </div>
                                <div className='brandOptionsInputs'>
                                    {brands.map((brand, index) => (
                                        <label key={index}>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand._id)}
                                                onChange={() => handleBrandChange(brand._id)}
                                            />
                                            {brand.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className='brandRange'>
                                <Slider range={{ draggableTrack: true }} defaultValue={[minPrice, maxPrice]} min={0} max={500}
                                    onChange={handleRangeChange} value={priceRange} />
                            </div>
                            <button type='submit'> FILTER PRODUCTS </button>
                        </form>
                        <div className="shopProducts">
                            <div className="shopProductsHeader">
                                <div className="filterBarButton" onClick={filterBarToggle}>
                                    <img src="../../../../../src/images/Filter.png" />
                                    <p> FILTER </p>
                                </div>
                                <div className='shopProductsHeaderLeft'>
                                    <label>
                                        <input type="checkbox" onChange={saleChange} checked={saleProducts} />
                                        Show only products on sale
                                    </label>
                                </div>
                                <div className="shopProductsHeaderRight" onClick={() => setOpenSort(!openSort)}>
                                    <p className="sortMain"> Sort{selectedSort} </p>
                                    <i className="lni lni-chevron-down"></i>
                                    <div className={`sortList ${openSort ? 'sortOpen' : ''}`}>
                                        <div onClick={() => handleSortChange(" by price")}> Sort by price </div>
                                        <div onClick={() => handleSortChange(" by name")}> Sort by name </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shopProductsBody">
                                {filteredProducts.map(data =>
                                    data.isPublish && (
                                        <div key={data._id} className='shopCard'>
                                            <div className='shopCardImage'>
                                                <div className="shopCardHeart">
                                                    {isInWishlist(data._id) ? (
                                                        <i className="bx bxs-heart" onClick={() => setWishlistIcon(!wishlistIcon)}></i>
                                                    ) : (
                                                        <i className="bx bx-heart" onClick={() => setWishlistIcon(!wishlistIcon)}></i>
                                                    )}
                                                </div>
                                                <button disabled={data.stock === 0} style={data.stock === 0 ? { cursor: "no-drop" } : {}}
                                                    className={`shopCardAddToCart ${data.stock === 0 ? "disabled" : ""}`}
                                                    onClick={() => addToBasketAndOpenSidebar(data)} > ADD TO CART
                                                </button>
                                                <div className="shopCardOptions">
                                                    <div className='quickView' onClick={(e) => { openModal(modalData); productDetails(data._id) }}>
                                                        <i className="bx bx-search"></i>
                                                        <div className="quickViewBadge"> Quick view
                                                            <div className="badgeTriangle"></div>
                                                        </div>
                                                    </div>
                                                    <div className='compare'>
                                                        <i className="bx bx-git-compare"></i>
                                                        <div className="compareBadge"> Compare
                                                            <div className="badgeTriangle"></div>
                                                        </div>
                                                    </div>
                                                    <div className='addToWishlist' onClick={() => addToWishlist(data)}>
                                                        {isInWishlist(data._id) ? (
                                                            <i className="bx bxs-heart" onClick={() => setWishlistIcon(!wishlistIcon)}></i>
                                                        ) : (
                                                            <i className="bx bx-heart" onClick={() => setWishlistIcon(!wishlistIcon)}></i>
                                                        )}
                                                        <div className="addToWishlistBadge"> Wishlist
                                                            <div className="badgeTriangle"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='badges'>
                                                    <div className={`soldoutBadge ${data.stock > 0 ? "close" : ""}`}> SOLD OUT </div>
                                                </div>
                                                <Link to={`/home/${data._id}/${getBrandName(data.brandId)}`}> <img className='shopCardImage1' src={data.images[0].url} /> </Link>
                                                <img className='shopCardImage2' src={data.images[1].url} />
                                            </div>
                                            <div className='shopCardDetails'>
                                                <Link to={`/home/${data._id}/${getBrandName(data.brandId)}`} className='shopCardTitle'> {data.title} </Link>
                                                <div className='shopCardPrice'>
                                                    <p className='shopCardNewPrice'> ${data.salePrice}.00 </p>
                                                    <p className='shopCardOldPrice'> ${data.productPrice}.00 </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="shopPagination">
                                <button disabled={currentIndex <= 1}
                                    onClick={() => {
                                        setCurrentIndex(currentIndex - 1)
                                        window.scrollTo(0, 0);
                                    }}

                                    style={currentIndex <= 1 ? { cursor: "no-drop" } : {}}
                                    className={currentIndex <= 1 ? "disabled" : ""} >
                                    <i className="bx bx-chevrons-left"></i>
                                </button>
                                {paginationButtons}
                                <button disabled={currentIndex === maxPageCount}
                                    onClick={() => {
                                        setCurrentIndex(currentIndex + 1)
                                        window.scrollTo(0, 0);
                                    }}
                                    style={currentIndex === maxPageCount ? { cursor: "no-drop" } : {}}
                                    className={currentIndex === maxPageCount ? "disabled" : ""}
                                > <i className="bx bx-chevrons-right"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`filterBarOverlay ${filterBar ? "toggle" : ""}`} onClick={handleOverlayClick}>
                <div className={`filterBar ${filterBar ? "toggle" : ""}`}>
                    <div className='shopProductsHeaderLeft-2'>
                        <label>
                            <input type="checkbox" onChange={saleChange} checked={saleProducts} />
                            Show only products on sale
                        </label>
                    </div>
                    <form onSubmit={handleSubmit} className="shopOptions-2">
                        <div className="brandOptions">
                            <div className="brandOptionsHeader"> BRANDS </div>
                            <div className='brandOptionsInputs'>
                                {brands.map((brand, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand._id)}
                                            onChange={() => handleBrandChange(brand._id)}
                                        />
                                        {brand.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='brandRange'>
                            <Slider range={{ draggableTrack: true }} defaultValue={[minPrice, maxPrice]} min={0} max={500} onChange={handleRangeChange} value={priceRange} />
                        </div>
                        <button type='submit'> FILTER PRODUCTS </button>
                        <button className='filterCloseButton' onClick={filterBarToggle}> CLOSE BAR </button>
                    </form>
                </div>
            </div>
            <DetailsModal modalData={modalData} modalOpen={modalOpen} openModal={openModal} getBrandName={getBrandName} />
        </div>
    )
}