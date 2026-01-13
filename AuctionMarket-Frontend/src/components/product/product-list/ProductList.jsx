import React from 'react';
import ProductCard from '../product-card/ProductCard.jsx';
import './ProductList.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Swiper 스타일 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductList = ({title, products}) => {
    return (
        <section className={"product-list"}>
            <div className={"product-header"}>
                <h2>{title}</h2>
                <a href={"/mord"} className={"more-link"}>More Products →</a>
            </div>
            <hr />
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}     // 카드 사이 간격
                slidesPerView={5.3}    // 한 번에 보여줄 카드 개수
                grabCursor={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    // 반응형 설정
                    1024: { slidesPerView: 5.3 },
                    768: { slidesPerView: 3 },
                    320: { slidesPerView: 1.5 }, // 모바일에선 살짝 걸치게 보임
                }}
                className="mySwiper"
                style={{height:"400px"}}
            >
                {products.map((item) => (
                    <SwiperSlide key={item.productResponse.productId}>
                        {/* SwiperSlide가 ProductCard를 감싸는 구조 */}
                        <ProductCard data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProductList;