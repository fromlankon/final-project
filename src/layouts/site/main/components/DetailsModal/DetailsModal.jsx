import React, { useState, useEffect, useContext } from 'react';
import "../DetailsModal/DetailsModal.css";
import { Link } from 'react-router-dom';
import { GlassMagnifier } from 'react-image-magnifiers';
import Loading from '../Loading/Loading';
import { BasketContext } from '../../../../../context/BasketContext';

export default function DetailsModal({ modalOpen, openModal, modalData, getBrandName }) {

    const { addToBasket } = useContext(BasketContext);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        setLoading(true);
        setItem(modalData);
    }, [modalData]);

    useEffect(() => {
        if (item?.data && item?.data?.images && item?.data?.images.length >= 1) {
            setMainImage(item?.data?.images[activeImageIndex].url);
            setImages([
                item?.data?.images[0].url,
                item?.data?.images[1].url,
                item?.data?.images[2].url,
                item?.data?.images[3].url
            ]);
            setLoading(false);
        }
    }, [item, activeImageIndex]);

    const handleImageClick = (index) => {
        setActiveImageIndex(index);

        const otherImages = document.querySelectorAll('.detailsModalOtherImages img');
        otherImages.forEach((image, i) => {
            if (i === index) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
        setMainImage(item.data.images[index].url);
    };

    return (
        <div className={`detailsModalOverlay ${modalOpen ? "visible" : ""}`}>
            {loading ? (
                <Loading />
            ) : (
                <div className="detailsModal">
                    <div className="detailsModalClose" onClick={openModal}>
                        <i className="lni lni-close"></i>
                    </div>
                    <div className='detailsModalLeft'>
                        <div className='detailsModalOtherImages'>
                            {images.map((img, index) => (
                                <div key={index}>
                                    <img src={img} className={activeImageIndex === index ? "active" : ""} alt={`Image ${index + 1}`} onClick={() => handleImageClick(index)} />
                                </div>
                            ))}
                        </div>
                        <div className='detailsModalMainImage'>
                            <p className='detailsModalBrandName'> {getBrandName(modalData.data.brandId)} </p>
                            <GlassMagnifier imageSrc={Object.values(images)[activeImageIndex]} magnifierSize="30%" magnifierBorderSize={1} magnifierBorderColor="rgba(255, 255, 255, 0.5)" />
                        </div>
                    </div>
                    <div className='detailsModalRight'>
                        <p className='detailsModalTitle'> {modalData?.data?.title} </p>
                        <div className='detailsModalRate'>
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
                                    {modalData?.data?.stock !== 0 ? (<span> In stock </span>) : (<span style={{ color: "red" }}> Out of stock </span>)}
                                </p>
                            </div>
                        </div>
                        <p className='detailsModalPrice'> ${modalData?.data?.salePrice}.00 </p>
                        <p className='detailsModalDescription'> {modalData?.data?.description} </p>
                        <div className="detailsModalButtons">
                            <button disabled={modalData?.data?.stock <= 0} style={modalData?.data?.stock <= 0 ? { cursor: "no-drop" } :
                                {}} className={`detailsModalAddButton ${modalData.data?.stock <= 0 ? "disabled" : ""}`}
                                onClick={() => addToBasket(modalData.data)} > ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}