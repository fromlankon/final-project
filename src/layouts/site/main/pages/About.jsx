import React, { useEffect } from 'react'
import "../CSS/About.css"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { aboutData } from '../../../../../mockData';
import Slider5 from '../components/Slider5/Slider5';

export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className='about'>
            <div className="aboutSection1">
                <div className="aboutLocation">
                    <Link to={"/home"} className='aboutText1'> Home </Link>
                    <p className='aboutText2'> / </p>
                    <p className='aboutText2'> About us </p>
                </div>
                <div className="aboutSection1text">
                    <p className='aboutText3'> About Noon’i </p>
                    <p className='aboutText4'> Noon’i was established in 1990, consectetur eleifend commodo at, consectetur eu justo. Sed viverra consectetur risus nec ultricies. </p>
                </div>
            </div>
            <div className="aboutSection2"></div>
            <div className="aboutSection3">
                <div className="aboutSection3main">
                    <div className="aboutSection3left">
                        <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/08/about-3-1.jpg" />
                    </div>
                    <div className="aboutSection3right">
                        <p className='aboutText6'> HOW WE WORKS </p>
                        <div>
                            <p className='aboutText7'> Production Design </p>
                            <p className='aboutText8'> Integer dignissim sagittis quam. Maecenas sem eros, rutrum vitae risus eget, vulputate aliquam nisi. </p>
                        </div>
                        <div>
                            <p className='aboutText7'> Manufacturing </p>
                            <p className='aboutText8'> Maecenas sem eros, rutrum vitae risus eget, vulputate aliquam nisi ex gravida neque tempus. </p>
                        </div>
                        <div>
                            <p className='aboutText7'> Marketing and selling </p>
                            <p className='aboutText8'> Rutrum vitae risus eget, vulputate aliquam nisi ex gravida neque tempus. </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="aboutSection4">
                <div className="aboutSection4main">
                    <p className='aboutText6'> OUR TEAM </p>
                    <Swiper slidesPerView={4} spaceBetween={30} loop={true} autoplay={{ disableOnInteraction: false, delay: 5000, pauseOnMouseEnter: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            400: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            620: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1080: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Autoplay]} className="aboutSwiper"
                    >
                        {aboutData.map((data) => (
                            <SwiperSlide className='aboutSlider'>
                                <div className='aboutSliderImage'>
                                    <img src={data.image} />
                                    <div className="aboutSliderSocialIcons">
                                        <i className="lni lni-facebook"></i>
                                        <i className="lni lni-twitter"></i>
                                        <i className="lni lni-instagram"></i>
                                    </div>
                                </div>
                                <div className='aboutSliderText'>
                                    <p className='aboutSliderText1'> {data.profession} </p>
                                    <p className='aboutSliderText2'> {data.name} </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="aboutSection5">
                <div className="aboutSection5content">
                    <div className="aboutSection5text">
                        <p className="aboutSection5text1"> We Deliver Genuine Products </p>
                        <p className="aboutSection5text2"> Sed viverra consectetur risus nec ultricies. Curabitur tincidunt tincidunt urna id maximus. </p>
                    </div>
                    <button> CONTACT US </button>
                </div>
            </div>
            <Slider5 />
        </div>
    )
}
