import { useContext, useEffect, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      setIsLoading(true);
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
          setIsLoading(false);
          console.log(err);
          setLoginError(err);
        });
    }
  });

  return (
    <>
      <div className='register'>
        <form className='registerForm' onSubmit={formik.handleSubmit}>
          <p className='signup'> Login </p>
          <div className='signinMain'>
            <input name="email" onChange={formik.handleChange} value={formik.values.email} type="mail" placeholder='Email' required />
            <div className='signInPassword'>
              <input name="password" onChange={formik.handleChange} value={formik.values.password} type={hide ? "text" : "password"} placeholder='Password' required />
              <i onClick={() => setHide(!hide)} className={hide ? "bi-eye-fill" : "bi-eye-slash-fill"}></i>
            </div>
            {loginError && <span className='siteInvalidLogin'> <i className="fa-solid fa-circle-exclamation"></i> Incorrect email adress or password </span>}
            <button type='submit'> {isLoading ?
              <img src="https://cdn.buymeacoffee.com/assets/img/widget/loader.svg?fbclid=IwAR3ma1xzQ6ZcO_k12qK6KnHmhKda-NYu8SHsWt23qzAA58a7-yRWNczgVsU" /> : "Sign In"}
            </button>
            <p className='dontHave'> Don't have an account? <Link to={"/register"} className='signupLink'> Sign up </Link> </p>
          </div>
        </form>
      </div>
    </>
  )
}