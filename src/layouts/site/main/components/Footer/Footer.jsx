import React from 'react'
import { Link } from 'react-router-dom'
import "../Footer/Footer.css"

export default function Footer() {
    return (
        <footer>
            <div className="footerContainer">
                <div className='footerMain'>
                    <div className='footerLeft'>
                        <div className='footerLeftTop'>
                            <Link className='footerLogo'>
                                <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2022/12/logo.png" />
                            </Link>
                            <p className='footerText1'> Sed quis quam ligula. Ut urna tellus, sagittis id libero nec, aliquet vehicula sem. Curabitur mattis lacus ante, a sodales dolor mollis eu. </p>
                        </div>
                        <div className='footerLeftBottom'>
                            <p className='footerText5'> Tel:(234)23-45-666 </p>
                            <p className='footerText5'> Mon-Fri: 8am – 8pm </p>
                            <p className='footerText5'> Sat-Sun: 8am – 7pm </p>
                        </div>
                    </div>
                    <div className='footerRight'>
                        <p className='footerText2'> SIGN UP FOR EMAILS </p>
                        <p className='footerText3'> Enjoy 15% off* your first order when you sign up to our newsletter </p>
                        <div className='subscribe'>
                            <input type="mail" placeholder='Your email adress' />
                            <button type='submit'> SUBSCRIBE </button>
                        </div>
                        <div className='footerLinks'>
                            <div className='footerLeftBottomReserve'>
                                <p className='footerText5'> Tel:(234)23-45-666 </p>
                                <p className='footerText5'> Mon-Fri: 8am – 8pm </p>
                                <p className='footerText5'> Sat-Sun: 8am – 7pm </p>
                            </div>
                            <div>
                                <Link to={"/about"} className='footerText4'> About Us </Link>
                                <Link className='footerText4'> Careers </Link>
                                <Link className='footerText4'> Influencers </Link>
                                <Link className='footerText4'> Join Our Team </Link>
                            </div>
                            <div>
                                <Link className='footerText4'> Contact Us </Link>
                                <Link className='footerText4'> Customer Service </Link>
                                <Link className='footerText4'> Find Store </Link>
                                <Link className='footerText4'> Shipping & Returns </Link>
                            </div>
                            <div>
                                <Link className='footerText4'> Interior Design </Link>
                                <Link className='footerText4'> Room Planner </Link>
                                <Link className='footerText4'> Our Projects </Link>
                                <Link className='footerText4'> Design Chat </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerInfo">
                    <div className='footerSocialIcons'>
                        <Link> <i className="lni lni-facebook"></i> </Link>
                        <Link> <i className="lni lni-twitter"></i> </Link>
                        <Link> <i className="lni lni-instagram"></i> </Link>
                        <Link> <i className="lni lni-whatsapp"></i> </Link>
                    </div>
                    <p className='footerText3'> © Nooni. All Rights Reserved. </p>
                    <div>
                        <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2022/12/payment.png" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
