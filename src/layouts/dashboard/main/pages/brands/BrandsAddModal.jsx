import React, { useState, useEffect } from 'react';
import { API } from '../../../../../config/axios';
import FileConverter from '../../../../../utils/FileConverter';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

export default function BrandsAddModal({ brandsModalOpen, brandsModal, getBrands }) {

    const initialPostState = {
        name: "",
        image: null
    };

    const [brands, setBrands] = useState(initialPostState);
    const [modalKey, setModalKey] = useState(0);

    useEffect(() => {
        if (!brandsModal) {
            resetForm();
        }
    }, [brandsModal]);

    const handleInput = (e) => {
        if (e.target.name === 'image') {
            FileConverter(e)
                .then((result) => {
                    setBrands({ ...brands, [e.target.name]: result });
                })
                .catch((err) => console.error(err));
        } else {
            setBrands({ ...brands, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/dashboard/brands", brands);
            console.log(res);
            getBrands();
            resetForm();
            brandsModalOpen();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setBrands(initialPostState);
        setModalKey((prevKey) => prevKey + 1);
    };

    const handleModalClose = () => {
        resetForm();
        brandsModalOpen();
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('brandsModalOverlay')) {
            resetForm();
            brandsModalOpen();
        }
    };

    return (
        <div key={modalKey} className={`brandsModalOverlay ${brandsModal ? "modalToggle" : ""}`} onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="brandsModal">
                <i onClick={handleModalClose} className="lni lni-close closeModal"></i>
                <input name='name' onChange={handleInput} value={brands.name} className='brandsTitleInput' type="text" placeholder='Add brand name' />
                <Upload
                    customRequest={({ file, onSuccess }) => {
                        FileConverter(file)
                            .then((result) => {
                                setBrands({ ...brands, image: result });
                                onSuccess();
                            })
                            .catch((err) => console.error(err));
                    }}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    className="upload-list-inline" >
                    <Button icon={<UploadOutlined />}> Upload Image </Button>
                </Upload>
                <button type='submit' className='brandsButton'> ADD BRAND </button>
            </form>
        </div>
    );
}