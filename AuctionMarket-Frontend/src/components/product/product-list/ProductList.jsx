import React from 'react';
import ProductCard from '../product-card/ProductCard.jsx';
import CategorySearch from "../../category/CategorySearch.jsx";
import './ProductList.css';

// Swiper 관련 임포트 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductList = ({ title, products, mode = 'carousel', setParams }) => {

    // 제품 아이템들을 렌더링하는 공통 함수 (그리드용)
    const renderProducts = () => products.map((item) => (
        <ProductCard key={item.productResponse.productId} data={item} />
    ));

    const [searchTitle, setSearchTitle] = React.useState("");

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setParams(prev => ({ ...prev, title: searchTitle, page: 0 }));
        }
    };

    const handleSortChange = (e) => {
        // 이전 논의에 맞춰 한 페이지에 20개씩(5줄) 나오도록 size를 20으로 설정
        setParams(prev => ({ ...prev, sort: e.target.value, page: 0, size: 20 }));
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
                    <div className="search-filter-section">
                        <div className="title-search-bar">
                            <input
                                type="text"
                                placeholder="상품명 검색..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                        <CategorySearch setParams={setParams} />
                        <div className="filter-spacer"></div>
                        <div className="sort-filter-wrapper">
                            <select className="sort-select" onChange={handleSortChange}>
                                <option value="createdAt,desc">최신 등록순</option>
                                <option value="endTime,asc">마감 임박순</option>
                                <option value="startPrice,asc">최저가순</option>
                                <option value="startPrice,desc">최고가순</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
            {mode === 'carousel' && <hr /> }

            {/* [수정] 모드에 따른 본문 출력 분기 */}
            {mode === 'carousel' ? (
                // 캐러셀 모드: Swiper 사용
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