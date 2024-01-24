import React, { useState, useContext } from 'react';
import './AdminLogin.css';
import { LoginCall } from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/AuthContext';

export default function AdminLogin() {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password,
        };

        LoginCall(loginData)
            .then(({ data }) => {
                console.log(data);
                localStorage.setItem("token", data.data.token);
                setUser(data.data.user);
                navigate("/admin/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="adminLogin">
            <div className="adminLoginContainer">
                <p> Welcome, please sign in </p>
                <div className="adminLoginInputs">
                    <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <div className='adminLoginPassword'>
                        <input type={showPassword ? "name" : "password"} placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <i class = {showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"} onClick={() => setShowPassword(!showPassword)}></i>
                    </div>
                    <button onClick={handleSubmit}> Sign in </button>
                </div>
            </div>
        </div>
    );
};