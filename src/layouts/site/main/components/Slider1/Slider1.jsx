import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider1.css';
import { Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Slider1() {
  return (
    <div className='slider1'>
      <Swiper modules={[EffectFade, Pagination]} effect="fade" pagination={{ clickable: true }} loop={true} className="mySwiper mySwiper1">
        <SwiperSlide>
          <div className='sliderText'>
            <div>
              <p className='sliderText1'> NEW ARRIVALS </p>
              <p className='sliderText2'> Discover The </p>
              <p className='sliderText2'> Latest Collection </p>
              <p className='sliderText3'> Free Shipping <span> On Orders $119+ </span> </p>
            </div>
            <div>
              <Link to={"/shop"} className='sliderLink'> SHOP NOW </Link>
            </div>
          </div>
          <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/slide-1-home4-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <div className='sliderText sliderImage2Text2'>
            <div>
              <p className='sliderText1'> FASHION WOMEN </p>
              <p className='sliderText2'> Sweaters Deals </p>
              <p className='sliderText2'> Up to 70% OFF </p>
              <p className='sliderText3'> Delivery And <span> Free Returns </span> </p>
            </div>
            <div>
              <Link to={"/shop"} className='sliderLink'> SHOP NOW </Link>
            </div>
          </div>
          <img className='sliderImage2' src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/slide-2-home4-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <div className='sliderText'>
            <div>
              <p className='sliderText1'> BIG SALE </p>
              <p className='sliderText2'> Up to 50% OFF </p>
              <p className='sliderText2'> Trendy Fashion </p>
              <p className='sliderText3'> Free Shipping <span> - Don't Miss The Deal </span> </p>
            </div>
            <div>
              <Link to={"/shop"} className='sliderLink'> SHOP NOW </Link>
            </div>
          </div>
          <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/slide-3-home4-1.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
