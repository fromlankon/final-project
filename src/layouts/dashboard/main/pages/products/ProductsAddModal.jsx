import React, { useState, useEffect } from 'react';
import { API } from '../../../../../config/axios';
import MultiplyConverter from '../../../../../utils/MultiplyConverter';
import { getBrands } from '../../../../../services/products';

export default function ProductsAddModal({ productsModalOpen, productsModal, getProducts }) {

    const initialPostState = {
        title: "",
        description: "",
        productPrice: "",
        salePrice: "",
        stock: "",
        brandId: "",
        images: [],
    };

    const [products, setProducts] = useState(initialPostState);
    const [modalKey, setModalKey] = useState(0);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectBrand, setSelectBrand] = useState(false);

    useEffect(() => {
        getBrands()
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!productsModal) {
            resetForm();
        }
    }, [productsModal]);

    const handleInput = (e) => {
        if (e.target.name === "image") {
            MultiplyConverter(e)
                .then((result) => {
                    setProducts({ ...products, [e.target.name]: result });
                })
                .catch((err) => console.error(err));
        } else {
            setProducts({ ...products, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/dashboard/products", products);
            getProducts();
            resetForm();
            productsModalOpen();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setProducts(initialPostState);
        setModalKey((prevKey) => prevKey + 1);
    };

    const handleModalClose = () => {
        resetForm();
        productsModalOpen();
    };

    const chooseBrand = (brand) => {
        const selectedBrand = brands.find((brandObject) => brandObject.name === brand);
        if (selectedBrand) {
            setSelectedBrand(selectedBrand.name);
            setProducts({ ...products, brandId: selectedBrand._id });
            setSelectBrand(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('productsModalOverlay')) {
            resetForm();
            productsModalOpen();
        }
    };

    return (
        <div className={`productsModalOverlay ${productsModal ? "modalToggle" : ""}`} onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="productsModal">
                <i onClick={handleModalClose} className="lni lni-close closeModal"></i>
                <input name='title' onChange={handleInput} value={products.title} className='productsTitleInput' type="text" placeholder='Product name' />
                <div className='countInputs'>
                    <input name='productPrice' onChange={handleInput} value={products.productPrice} className='productsInput' type="text" placeholder='Price' />
                    <input name='salePrice' onChange={handleInput} value={products.salePrice} className='productsInput' type="text" placeholder='Sale price' />
                    <input name='stock' onChange={handleInput} value={products.stock} className='productsInput' type="text" placeholder='Stock count' />
                </div>
                <div onClick={() => setSelectBrand(!selectBrand)} className={`productsModalBrandsSelect ${selectBrand ? "block" : ""}`}>
                    {selectedBrand ? <span> {selectedBrand} </span> : <span> Select brand </span>}
                    <i className="fa-solid fa-chevron-down"></i>
                    <div className={`productsModalBrandsOptions ${selectBrand ? "block" : ""}`}>
                        {brands.map((brand) => (
                            <p key={brand._id} onClick={() => chooseBrand(brand.name)}>
                                {brand.name}
                            </p>
                        ))}
                    </div>
                </div>
                <textarea name='description' onChange={handleInput} value={products.description} className='descriptionInput' type="name" placeholder='Product description' />
                <div className='productsAddModalImage'>
                    <input type="file" id='uploadImageButton' multiple={true} onChange={(e) => {
                        MultiplyConverter(e).then((res) => {
                            console.log(res)
                            setProducts({ ...products, images: res });
                        }).catch((err) => {
                            console.log(err)
                        })
                    }} />
                    <label htmlFor="uploadImageButton" className='uploadButtonLabel'> <img src="../../../../../../src/images/Upload.png" /> Upload Image </label>
                </div>
                <button type='submit' className='productsButton'> ADD PRODUCT </button>
            </form>
        </div>
    );
}