import { useState, useContext } from 'react';
import './AdminLogin.css';
import { LoginCall } from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/AuthContext';

export default function AdminLogin() {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

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
                setLoginError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="adminLogin">
            <form className="adminLoginContainer" onSubmit={handleSubmit}>
                <p> Welcome, please sign in </p>
                <div className="adminLoginForm">
                    <div className='adminLoginInputBox'>
                        <div className='inputBox'>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className='adminLoginPassword adminLoginInputBox'>
                        <div className='inputBox'>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <i className={showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"} onClick={() => setShowPassword(!showPassword)}></i>
                    </div>
                    {loginError && <span className='invalidLogin'> <i className="fa-solid fa-circle-exclamation"></i> Incorrect email adress or password </span>}
                    <button type='submit'> {isLoading ?
                        <img src="https://cdn.buymeacoffee.com/assets/img/widget/loader.svg?fbclid=IwAR3ma1xzQ6ZcO_k12qK6KnHmhKda-NYu8SHsWt23qzAA58a7-yRWNczgVsU" /> : "LOGIN"}
                    </button>
                </div>
            </form>
        </div>
    );
};