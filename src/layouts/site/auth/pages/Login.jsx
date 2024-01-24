import React, { useContext, useEffect, useState } from 'react'
import "../../main/CSS/Form.css"
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../main/components/Header/Header'
import { useFormik } from 'formik';
import Discount from '../../main/components/Discount/Discount';
import Footer from '../../main/components/Footer/Footer';
import { LoginCall } from '../../../../services/auth';
import { UserContext } from '../../../../context/AuthContext';

export default function Login() {

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      LoginCall(values)
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem("token", data.data.token)
          navigate("/home")
          setUser(data.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  });

  const [hide, setHide] = useState(false)

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
              <input name="password" onChange={formik.handleChange} value={formik.values.password} type={hide ? "name" : "password"} id='signinPassword' required="" />
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
