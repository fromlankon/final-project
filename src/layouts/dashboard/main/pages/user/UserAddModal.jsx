import React, { useState, useEffect } from 'react';
import { API } from '../../../../../config/axios';

export default function UserAddModal({ userModalOpen, userModal, getUser }) {

    const [showPassword, setShowPassword] = useState(false)

    const initialState = {
        name: "",
        surname: "",
        email: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);
    const [modalKey, setModalKey] = useState(0);

    useEffect(() => {
        if (!userModal) {
            resetForm();
        }
    }, [userModal]);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/dashboard/register", user);
            console.log(res);
            getUser();
            resetForm();
            userModalOpen();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setUser(initialState);
        setModalKey((prevKey) => prevKey + 1);
    };

    const handleModalClose = () => {
        resetForm();
        userModalOpen();
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('userModalOverlay')) {
            resetForm();
            userModalOpen();
        }
    };

    return (
        <div key={modalKey} className={`userModalOverlay ${userModal ? "modalToggle" : ""}`} onClick={handleOverlayClick}>
            <form onSubmit={handleSubmit} className="userModal">
                <i className="lni lni-close closeModal" onClick={handleModalClose}></i>
                <div className='userNameInputs'>
                    <input name='name' onChange={handleInput} value={user.name} className='userTitleInput' type="text" placeholder='Name' />
                    <input name='surname' onChange={handleInput} value={user.surname} className='userTitleInput' type="text" placeholder='Surname' />
                </div>
                <input name='email' onChange={handleInput} value={user.email} className='userTitleInput' type="text" placeholder='Email' />
                <div className='userPasswordInput'>
                    <input name='password' onChange={handleInput} value={user.password} className='userTitleInput' type={showPassword ? "name" : "password"} placeholder='Password' />
                    <i class={showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"} onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <button type='submit' className='userButton'> ADD USER </button>
            </form>
        </div>
    );
}