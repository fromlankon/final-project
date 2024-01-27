import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "./Slider5.css";
import { getBrands } from '../../../../../services/products';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';

export default function Slider5() {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        getBrands()
            .then((res) => {
                setBrands(res.data)
            })
    }, []);

    return (
        <div className='section5'>
            <div className="section5container">
                <p className='section5name'> OUR BRANDS</p>
                <Swiper slidesPerView={6} spaceBetween={20} loop={true} autoplay={{ disableOnInteraction: false, delay: 5000, pauseOnMouseEnter: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        450: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        600: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        },
                        900: {
                            slidesPerView: 5,
                            spaceBetween: 0,
                        },
                        1200: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }} modules={[Autoplay]} className="mySwiper5">
                    {brands.map((data => {
                        return (
                            <SwiperSlide key={data._id}>
                                <div className='slider5image'>
                                    <img src={data.image.url} />
                                </div>
                            </SwiperSlide>
                        )
                    }))}
                </Swiper>
            </div>
        </div>
    );
}
