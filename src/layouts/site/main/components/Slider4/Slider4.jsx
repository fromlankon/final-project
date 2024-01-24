import React from 'react'
import { fourthSliderData } from '../../../../../../mockData'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "./Slider4.css";
import { Pagination } from 'swiper/modules';

export default function Slider4() {
    return (
        <div className="section4">
            <p className='section4name'> OUR REVIEWS </p>
            <div className='slider4'>
                <Swiper modules={[Pagination]} pagination={{ clickable: true, el: '.swiper-custom-pagination' }} slidesPerView={2} spaceBetween={20} loop={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1500: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                    }}
                    className="mySwiper4">
                    {fourthSliderData.map((data => {
                        return (
                            <SwiperSlide key={data.id} className='swiper-slide4'>
                                <div className='slider4image'>
                                    <img src={data.image} />
                                </div>
                                <div className='slider4content'>
                                    <p className='slider4name'> {data.name} </p>
                                    <p className='slider4review'> {data.review} </p>
                                    <div className='slider4stars'>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }))}
                </Swiper>
            </div>
            <div className="swiper-custom-pagination" />
        </div>
    )
}