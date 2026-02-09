import React, { useState } from 'react';
import ProductCard from '@/components/product/read/product-card/ProductCard.jsx';
import CategorySearch from "@/components/category/CategorySearch.jsx";
import {useCategoryLookup} from '@/hooks/category/useCategoryLookup.js'
import SearchFilter from "@/components/product/search/SearchFilter.jsx";
import './ProductList.css';

// Swiper 관련 임포트 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductList = ({ title, products, mode = 'carousel', params, setParams }) => {
    const { data: lookup = {} } = useCategoryLookup();

// 💡 params.path가 "1/5/10" 이라면, '/'로 잘라서 마지막 요소인 "10"만 가져옵니다.
    const lastCategoryId = params?.path ? params.path.split('/').pop() : "";

// 💡 잘라낸 마지막 ID로 이름을 찾습니다.
    const categoryName = lookup[String(lastCategoryId)]?.name || "전체 카테고리";

    const renderProducts = () => products.map((item) => (
        <ProductCard key={item.productResponse.productId} data={item} />
    ));

    const [searchTitle, setSearchTitle] = useState("");

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setParams(prev => ({ ...prev, title: searchTitle, page: 0 }));
        }
    };

    const handleSortChange = (e) => {
        setParams(prev => ({ ...prev, sort: e.target.value, page: 0, size: 12 }));
    };
    return (
        <section className={`product-list ${mode}`}>
            <div className="product-header">
                {mode === 'carousel' ? (
                    <>
                        <h2>{title}</h2>
                        <a href={"/shop"} className="more-link">More Products →</a>
                    </>
                ) : (
                    <SearchFilter
                        params={params}
                        setParams={setParams}
                        categoryName={categoryName}
                    />
                )}
            </div>
            {/* [수정] 모드에 따른 본문 출력 분기 */}
            {mode === 'carousel' ? (
                // 캐러셀 모드: Swiper 사용
                <>
                    <hr />
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={5.3}
                        grabCursor={true}
                        className="mySwiper"
                        breakpoints={{
                            1024: { slidesPerView: 5.3 },
                            768: { slidesPerView: 3 },
                            320: { slidesPerView: 1.5 },
                        }}
                    >
                        {products.map((item) => (
                            <SwiperSlide key={item.productResponse.productId}>
                                <ProductCard data={item} />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </>
            ) : (
                // 그리드 모드: 일반 div 레이아웃 사용
                <div className="product-grid-layout">
                    {renderProducts()}
                </div>
            )}
        </section>
    );
};

export default ProductList;