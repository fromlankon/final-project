import React, { useEffect, useState } from 'react'
import "../../main/CSS/Form.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { RegisterCall } from '../../../../services/auth';

export default function Register() {

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      RegisterCall(values)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          navigate("/home");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });

  const [hide, setHide] = useState(false)

  return (
    <>
      <div className='register'>
        <form className='registerForm' onSubmit={formik.handleSubmit}>
          <p className='signup'> Register </p>
          <div className='signinMain'>
            <div className='label'>
              <label htmlFor="signinName">Name<span style={{ color: "rgb(209 2 2)" }}> * </span> </label>
              <input name="name" onChange={formik.handleChange} value={formik.values.name} type="name" id='signinName' required="" />
            </div>
            <div className='label'>
              <label htmlFor="signinSurname">Surname<span style={{ color: "rgb(209 2 2)" }}> * </span> </label>
              <input name="surname" onChange={formik.handleChange} value={formik.values.surname} type="name" id='signinSurname' required="" />
            </div>
            <div className='label'>
              <label htmlFor="signinMail">Email<span style={{ color: "rgb(209 2 2)" }}> * </span> </label>
              <input name="email" onChange={formik.handleChange} value={formik.values.email} type="mail" id='signinMail' required="" />
            </div>
            <div className='label'>
              <label htmlFor="signinPassword">Password<span style={{ color: "rgb(209 2 2)" }}> * </span> </label>
              <input name="password" onChange={formik.handleChange} value={formik.values.password} type={hide ? "text" : "password"} id='signinPassword' required="" />
              <i onClick={() => setHide(!hide)} className={hide ? "bi-eye-fill" : "bi-eye-slash-fill"}></i>
            </div>
            <div className='checkboxLabel'>
              <input type="checkbox" id='signinCheckbox' required />
              <label htmlFor="signinCheckbox"> I accept the <Link className='terms'> Terms and Conditions </Link> </label>
            </div>
            <button type='Submit'> Sign up </button>
            <p className='dontHave'> Already have an account? <Link to={"/login"} className='signupLink'> Sign in </Link> </p>
          </div>
        </form>
      </div>
    </>
  )
}
