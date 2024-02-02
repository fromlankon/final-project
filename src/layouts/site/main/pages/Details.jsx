import React, { useState, useEffect, useContext } from 'react'
import "../CSS/Details.css"
import { Link, useParams } from 'react-router-dom'
import { GlassMagnifier } from 'react-image-magnifiers';
import { getSingleProduct } from '../../../../services/products'
import Loading from '../components/Loading/Loading';
import { BasketContext } from '../../../../context/BasketContext';
import { WishlistContext } from '../../../../context/WishlistContext';
import { sidebarContext } from '../../../../context/SidebarContext';

function Lightbox({ lightboxImages, onClose, activeImageIndex }) {
    
    const [lightboxIndex, setLightboxIndex] = useState(activeImageIndex);

    const handlePrevClick = () => {
        setLightboxIndex((prevIndex) => (prevIndex - 1 + lightboxImages.length) % lightboxImages.length);
    };

    const handleNextClick = () => {
        setLightboxIndex((prevIndex) => (prevIndex + 1) % lightboxImages.length);
    };

    return (
        <div className="lightbox">
            <span className="close-btn" onClick={onClose}>
                <i className="bi bi-x"></i>
            </span>
            <button className="prev-btn" onClick={handlePrevClick}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <img src={lightboxImages[lightboxIndex]} />
            <button className="next-btn" onClick={handleNextClick}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default function Details() {

    const { addToBasket } = useContext(BasketContext);
    const { addToWishlist, isInWishlist, wishlistIcon, setWishlistIcon } = useContext(WishlistContext);
    const { setShow } = useContext(sidebarContext);

    const addToBasketAndOpenSidebar = (data) => {
        addToBasket(data);
        setShow(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [item, setItem] = useState({});
    let { _id } = useParams();
    const { brandName } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSingleProduct(_id);
                setItem(res);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [_id]);

    const [lightboxImages, setLightboxImages] = useState([
        item.data?.images[0].url,
        item.data?.images[1].url,
        item.data?.images[2].url,
        item.data?.images[3].url
    ]);

    const [mainImage, setMainImage] = useState("");
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (item.data && item.data.images && item.data.images.length >= 1) {
            setMainImage(item.data.images[activeImageIndex].url);
            setLightboxImages([
                item.data.images[0].url,
                item.data.images[1].url,
                item.data.images[2].url,
                item.data.images[3].url
            ]);
        }
    }, [item, activeImageIndex]);

    const handleImageClick = (index) => {
        setActiveImageIndex(index);

        const otherImages = document.querySelectorAll('.otherImages img');
        otherImages.forEach((image, i) => {
            if (i === index) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
        setMainImage(item.data.images[index].url);
    };

    const handleMainImageClick = () => {
        setIsLightboxOpen(true);

        const otherImages = document.querySelectorAll('.otherImages img');
        otherImages.forEach((image, index) => {
            if (index === activeImageIndex) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
    };

    const handleLightboxClose = () => {
        setIsLightboxOpen(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='details'>
            <div className="detailsContainer">
                <div className='detailsLeft'>
                    <div className='otherImages'>
                        {lightboxImages.map((img, index) => (
                            <div key={index}>
                                <img src={img} onClick={() => handleImageClick(index)} className={activeImageIndex === index ? "active" : ""} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className='mainImage' onClick={handleMainImageClick}>
                        <span className='brandName'>  {brandName} </span>
                        {mainImage && <GlassMagnifier imageSrc={mainImage} magnifierSize="30%" magnifierBorderSize={1} magnifierBorderColor="rgba(255, 255, 255, 0.5)" />}
                    </div>
                    {isLightboxOpen && <Lightbox lightboxImages={Object.values(lightboxImages)} onClose={handleLightboxClose} activeImageIndex={activeImageIndex} />}
                </div>
                <div className='detailsRight'>
                    <p className='detailsTitle'> {item.data?.title} </p>
                    <div className='rate'>
                        <div className='rating'>
                            <div className='slider4stars'>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                            <p> (5) </p>
                        </div>
                        <div className='detailsStock'>
                            <p> Stock:
                                {item.data?.stock !== 0 ? (<span> In stock </span>) : (<span style={{ color: "red" }}> Out of stock </span>)}
                            </p>
                        </div>
                    </div>
                    <p className='detailsPrice'> ${item.data?.salePrice}.00 </p>
                    <p className='detailsDescription'> {item.data?.description} </p>
                    <div className="detailsButtons">
                        <button disabled={item.data?.stock <= 0} style={item.data?.stock <= 0 ? { cursor: "no-drop" } :
                            {}} className={`detailsButton ${item.data?.stock <= 0 ? "disabled" : ""}`}
                            onClick={() => addToBasketAndOpenSidebar(item.data)} > ADD TO CART
                        </button>
                    </div>
                    <div className='detailsOptions'>
                        <div className='detailsOptionsLeft'>
                            <div onClick={() => { addToWishlist(item.data); setWishlistIcon(!wishlistIcon); }}>
                                <i className={`bx ${isInWishlist(item.data._id) ? "bxs-heart" : "bx-heart"}`}></i>
                                <p> Add to wishlist </p>
                            </div>
                            <div>
                                <i className="bx bx-git-compare"></i>
                                <p> Compare </p>
                            </div>
                        </div>
                        <div className='detailsSocialIcons'>
                            <Link> <i className="lni lni-facebook"></i> </Link>
                            <Link> <i className="lni lni-twitter"></i> </Link>
                            <Link> <i className="lni lni-instagram"></i> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}