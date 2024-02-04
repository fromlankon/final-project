import { useEffect, useState } from 'react'
import "../../main/CSS/Form.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { RegisterCall } from '../../../../services/auth';

export default function Register() {

  const [hide, setHide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    onSubmit: values => {
      setIsLoading(true);
      RegisterCall(values)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          navigate("/home");
          window.location.reload();
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response && err.response.status === 400) {
            setEmailExists(true);
          }
          console.log(err);
        })
    },
  });

  return (
    <>
      <div className='register'>
        <form className='registerForm' onSubmit={formik.handleSubmit}>
          <p className='signup'> Register </p>
          <div className='signinMain'>
            <input name="name" onChange={formik.handleChange} value={formik.values.name} type="name" placeholder='Name' required />
            <input name="surname" onChange={formik.handleChange} value={formik.values.surname} type="name" placeholder='Surname' required />
            <input name="email" onChange={formik.handleChange} value={formik.values.email} type="mail" placeholder='Email' required />
            {emailExists && <span className='usedEmail'> <i className="fa-solid fa-circle-exclamation"></i> This email address already exists </span>}
            <div className='signInPassword'>
              <input name="password" onChange={formik.handleChange} value={formik.values.password} type={hide ? "text" : "password"} placeholder='Password' required />
              <i onClick={() => setHide(!hide)} className={hide ? "bi-eye-fill" : "bi-eye-slash-fill"}></i>
            </div>
            <div className='checkboxLabel'>
              <input type="checkbox" id='signinCheckbox' required />
              <label htmlFor="signinCheckbox"> I accept the <Link className='terms'> Terms and Conditions </Link> </label>
            </div>
            <button type='submit'> {isLoading ?
              <img src="https://cdn.buymeacoffee.com/assets/img/widget/loader.svg?fbclid=IwAR3ma1xzQ6ZcO_k12qK6KnHmhKda-NYu8SHsWt23qzAA58a7-yRWNczgVsU" /> : "Sign Up"}
            </button>
            <p className='dontHave'> Already have an account? <Link to={"/login"} className='signupLink'> Sign in </Link> </p>
          </div>
        </form>
      </div>
    </>
  )
}