import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Slider3.css";
import { Link } from 'react-router-dom';
import DetailsModal from '../DetailsModal/DetailsModal';
import { BasketContext } from '../../../../../context/BasketContext';
import { WishlistContext } from '../../../../../context/WishlistContext';
import { sidebarContext } from '../../../../../context/SidebarContext';
import { getBrands, getProducts } from '../../../../../services/products';
import { Autoplay } from 'swiper/modules';
import { API } from '../../../../../config/axios';

export default function Slider3() {

    const { addToBasket } = useContext(BasketContext);
    const { addToWishlist, isInWishlist, wishlistIcon, setWishlistIcon } = useContext(WishlistContext);
    const { setShow } = useContext(sidebarContext);
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([]);
    const [modalData, setModalData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = (data) => {
        setModalData({ data, brandId: data.brandId });
        setModalOpen(!modalOpen);
    }

    const addToBasketAndOpenSidebar = (data) => {
        addToBasket(data);
        setShow(true);
    };

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

    const productDetails = (_id) => {
        API.get(`/site/products/${_id}`)
            .then((res) => {
                setModalData(res.data);
            })
    }

    const getBrandName = (brandId) => {
        const brand = brands.find(brand => brand._id === brandId);
        return brand ? brand.name : "";
    };

    return (
        <div className='slider3'>
            <div className='slider3Header'>
                <p> BESTSELLERS </p>
            </div>
            <Swiper slidesPerView={3} spaceBetween={30} loop={true} autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    400: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1040: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1500: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                modules={[Autoplay]}
                className="mySwiper3">
                {products.map(data => (
                    (data.isDeal === true && (
                        <SwiperSlide key={data._id} className='swiper-slide3'>
                            <div className='swiper-slide3-image'>
                                <div className="slider3cartHeart">
                                    {isInWishlist(data._id) ? (
                                        <i className="bx bxs-heart" onClick={() => setWishlistIcon(!wishlistIcon)}></i>
                                    ) : (
                                        <i className="bx bx-heart" onClick={() => setWishlistIcon(!wishlistIcon)}></i>
                                    )}
                                </div>
                                <button disabled={data.stock === 0} style={data.stock === 0 ? { cursor: "no-drop" } : {}}
                                    className={`slider3-cart-add-to-cart ${data.stock === 0 ? "disabled" : ""}`}
                                    onClick={() => addToBasketAndOpenSidebar(data)} > ADD TO CART
                                </button>
                                <div className="slider3-cart-options">
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
                                <Link to={`${data._id}/${getBrandName(data.brandId)}`}> <img className='slide3image1' src={data.images[0].url} /> </Link>
                                <img className='slide3image2' src={data.images[1].url} />
                            </div>
                            <div className='slider3cartDetails'>
                                <Link to={`${data._id}/${getBrandName(data.brandId)}`} className='swiper-slide3-title'> {data.title} </Link>
                                <div className='slider3cartPrice'>
                                    <p className='slider3cartNewPrice'> ${data.salePrice}.00 </p>
                                    <p className='slider3cartOldPrice'> ${data.productPrice}.00 </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ))}
            </Swiper>
            <Link to={"/shop"} className='slider3Footer'> SEE ALL </Link>
            <DetailsModal modalData={modalData} modalOpen={modalOpen} openModal={openModal} getBrandName={getBrandName} />
        </div>
    )
}