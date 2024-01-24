import React, { useState, useEffect } from 'react';
import { API } from '../../../../../config/axios';
import FileConverter from '../../../../../utils/FileConverter';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

export default function BrandsUpdateModal({ brandsUpdateModal, setBrandsUpdateModal, brandsUpdateModalOpen, brandId, getBrands, productName, imageSrc }) {

    const [brands, setBrands] = useState({
        name: "",
        image: null
    });

    const [currentImageSrc, setCurrentImageSrc] = useState(null);

    useEffect(() => {
        setBrands({ ...brands, name: productName });
        setCurrentImageSrc(imageSrc);
    }, [productName, imageSrc]);

    const handleInput = (e) => {
        if (e.target.name === "image") {
            FileConverter(e)
                .then((result) => {
                    setBrands({ ...brands, [e.target.name]: result });
                    setCurrentImageSrc(result);
                })
                .catch((err) => console.error(err));
        } else {
            setBrands({ ...brands, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!brandId) {
            console.error("error");
            return;
        }

        API.put(`/dashboard/brands/${brandId}`, brands)
            .then((res) => {
                console.log(res);
                getBrands();
                brandsUpdateModalOpen();
            })
            .catch((err) => console.error(err));
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('brandsUpdateModalOverlay')) {
            brandsUpdateModalOpen();
        }
    };

    return (
        <div className={`brandsUpdateModalOverlay ${brandsUpdateModal ? "modalToggle" : ""}`} onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="brandsUpdateModal">
                <i onClick={() => setBrandsUpdateModal(false)} className="lni lni-close closeUpdateModal"></i>
                <input name='name' value={brands.name} onChange={handleInput} className='brandsTitleInput' type="text" />
                <Upload
                    customRequest={({ file, onSuccess }) => {
                        FileConverter(file)
                            .then((result) => {
                                setBrands({ ...brands, image: result });
                                setCurrentImageSrc(result);
                                onSuccess();
                            })
                            .catch((err) => console.error(err));
                    }}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    className="upload-list-inline" >
                    <Button icon={<UploadOutlined />}> Upload Image </Button>
                </Upload>
                <button type='submit' className='brandsButton'> UPDATE BRAND </button>
            </form>
        </div>
    );
}