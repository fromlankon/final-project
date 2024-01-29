import React, { useEffect, useState } from 'react'
import { getBrands } from '../../../../../services/products';
import { API } from '../../../../../config/axios';
import MultiplyConverter from '../../../../../utils/MultiplyConverter';

export default function ProductsUpdateModal({ openUpdateModal, productsUpdateModal, getProducts, selectedProduct }) {

    const [brands, setBrands] = useState([]);
    const [selectBrand, setSelectBrand] = useState(false);
    const [products, setProducts] = useState({
        title: "",
        description: "",
        productPrice: "",
        salePrice: "",
        stock: "",
        brandId: "",
        images: [],
    });

    useEffect(() => {
        if (selectedProduct) {
            setProducts({
                title: selectedProduct.title,
                description: selectedProduct.description,
                productPrice: selectedProduct.productPrice,
                salePrice: selectedProduct.salePrice,
                stock: selectedProduct.stock,
                brandId: selectedProduct.brandId,
                images: selectedProduct.images,
            });
        }
    }, [selectedProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProduct || !selectedProduct._id) {
            console.error("Invalid product data");
            return;
        }
        API.put(`/dashboard/products/${selectedProduct._id}`, products)
            .then((res) => {
                console.log(res);
                getProducts();
                openUpdateModal();
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getBrands()
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleInput = (e) => {
        if (e.target.name === 'image') {
            MultiplyConverter(e)
                .then((result) => {
                    setProducts({ ...products, [e.target.name]: result });
                })
                .catch((err) => console.error(err));
        } else {
            setProducts({ ...products, [e.target.name]: e.target.value });
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('productsUpdateModalOverlay')) {
            openUpdateModal();
        }
    };

    return (
        <div className={`productsUpdateModalOverlay ${productsUpdateModal ? "modalToggle" : ""}`} onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="productsUpdateModal">
                <i onClick={openUpdateModal} className="lni lni-close closeModal"></i>
                <input name='title' onChange={handleInput} value={products.title} className='productsTitleInput' type="text" placeholder='Product name' />
                <div className='countInputs'>
                    <input name='productPrice' onChange={handleInput} value={products.productPrice} className='productsInput' type="text" placeholder='Price' />
                    <input name='salePrice' onChange={handleInput} value={products.salePrice} className='productsInput' type="text" placeholder='Sale price' />
                    <input name='stock' onChange={handleInput} value={products.stock} className='productsInput' type="text" placeholder='Stock count' />
                </div>
                <div onClick={() => setSelectBrand(!selectBrand)} className={`productsModalBrandsSelect ${selectBrand ? "block" : ""}`}>
                    <span>{products.brandId ? brands.find(brand => brand._id === products.brandId)?.name || 'Select brand' : 'Select brand'}</span>
                    <i className="fa-solid fa-chevron-down"></i>
                    <div className={`productsModalBrandsOptions ${selectBrand ? "block" : ""}`}>
                        {brands.map((brand) => (
                            <p key={brand._id} onClick={() => setProducts({ ...products, brandId: brand._id })}>
                                {brand.name}
                            </p>
                        ))}
                    </div>
                </div>
                <textarea name='description' onChange={handleInput} value={products.description} className='descriptionInput' type="name" placeholder='Product description' />
                <div className='productsUpdateModalImage'>
                    <input type="file" id='uploadButton' multiple={true} onChange={(e) => {
                        MultiplyConverter(e).then((res) => {
                            console.log(res)
                            setProducts({ ...products, images: res });
                        }).catch((err) => {
                            console.log(err)
                        })
                    }} />
                    <label htmlFor="uploadButton" className='uploadButtonLabel'> <img src="../../../../../../src/images/Upload.png" /> Upload Image </label>
                </div>
                <div className='productsUpdateModalGetImages'>
                    {products.images && products.images.map((img) => (
                        <img src={typeof img === "string" ? img : img.url} />
                    ))}
                </div>
                <button type='submit' className='productsButton'> UPDATE PRODUCT </button>
            </form>
        </div>
    )
}