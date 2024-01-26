import React, { useContext, useEffect, useState } from 'react'
import "../../main/CSS/Form.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { LoginCall } from '../../../../services/auth';
import { UserContext } from '../../../../context/AuthContext';
import { BasketContext } from '../../../../context/BasketContext';
import { APIwithToken } from '../../../../config/axios';

export default function Login() {

  const { setUser } = useContext(UserContext);
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      LoginCall(values)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          if (data.data.user) {
            if ((basket || []).length > 0) {
              const formattedBasket = basket.map((item) => ({
                productId: item._id,
                productCount: item.productCount,
              }));
              console.log(formattedBasket);

              const postmanBasket = formattedBasket.map((item) => ({
                productId: item.productId,
                productCount: item.productCount,
              }));
              console.log(postmanBasket);

              const postmanRequest = { basket: postmanBasket };
              console.log(postmanRequest);

              APIwithToken(data.data.token)
                .post("/site/basket", postmanRequest)
                .then((res) => {
                  setBasket([]);
                  setUser(data.data.user);
                  navigate("/home");
                  location.href = "/home";
                });
            } else {
              setBasket([]);
              setUser(data.data.user);
              location.href = "/home";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <>
      <div className='register'>
        <form className='registerForm' onSubmit={formik.handleSubmit}>
          <p className='signup'> Login </p>
          <div className='signinMain'>
            <div className='label'>
              <label htmlFor="signinMail"> Email <span style={{ color: "rgb(209 2 2)" }}> * </span> </label>
              <input name="email" onChange={formik.handleChange} value={formik.values.email} type="mail" id='signinMail' required="" />
            </div>
            <div className='label'>
              <label htmlFor="signinPassword"> Password <span style={{ color: "rgb(209 2 2)" }}> * </span> </label>
              <input name="password" onChange={formik.handleChange} value={formik.values.password} type={hide ? "text" : "password"} id='signinPassword' required="" />
              <i onClick={() => setHide(!hide)} className={hide ? "bi-eye-fill" : "bi-eye-slash-fill"}></i>
            </div>
            <button type='Submit'> Sign In </button>
            <p className='dontHave'> Don't have an account? <Link to={"/register"} className='signupLink'> Sign up </Link> </p>
          </div>
        </form>
      </div>
    </>
  )
}