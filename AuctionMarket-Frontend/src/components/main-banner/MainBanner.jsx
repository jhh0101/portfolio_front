import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './MainBanner.css'
import LeftArrow from '../../assets/arrow-left.svg';
import RightArrow from '../../assets/arrow-right.svg';

// Swiper 스타일 임포트 (필수)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainBanner = () => {
    return (
        <main>
            <section className="banner-wrapper">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    pagination={{clickable: true}}
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    loop={true}
                    className="mySwiper"
                    style={{backgroundColor: 'black'}}
                >
                    <SwiperSlide><div className="temp-slide">Slide 1</div></SwiperSlide>
                    <SwiperSlide><div className="temp-slide">Slide 2</div></SwiperSlide>
                    <SwiperSlide><div className="temp-slide">Slide 3</div></SwiperSlide>
                </Swiper>

                {/* 커스텀 버튼 배치 */}
                <div className="custom-prev">
                    <img src={LeftArrow} alt="이전" />
                </div>
                <div className="custom-next">
                    <img src={RightArrow} alt="다음" />
                </div>
            </section>

        </main>
    );
};

export default MainBanner;