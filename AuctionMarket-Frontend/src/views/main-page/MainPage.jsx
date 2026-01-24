// src/views/main-page/MainPage.jsx
import './MainPage.css'
import MainBanner from "../../components/main-banner/MainBanner.jsx";
import ProductList from "../../components/product/product-list/ProductList.jsx";
import ProductCardSkeleton from "../../components/common/ProductCardSkeleton.jsx";
import React from "react";
import {useMainPageData} from "../../hooks/useMainPageData.js";

const MainPage = () => {
    const {newAuction, closingAuction, isLoading, isError} = useMainPageData();

    if (isError) {
        return <div>서버 연결에 문제가 발생했습니다.</div>
    }

    return (
        <div className="main-page">
            <MainBanner />

            {/* 신규 경매 섹션 */}
            {isLoading ? (
                <div className="product-grid">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <ProductCardSkeleton key={n} />
                    ))}
                </div>
            ) : newAuction.content.length === 0 ? (
                <p>등록된 상품이 없습니다.</p>
            ) : (
                <ProductList title={"신규 경매 상품"} products={newAuction.content} mode="carousel" />
            )}

            {/* 마감 임박 섹션 */}
            {isLoading ? (
                <div className="product-grid">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <ProductCardSkeleton key={n} />
                    ))}
                </div>
            ) : closingAuction.content.length === 0 ? (
                <p>등록된 상품이 없습니다.</p>
            ) : (
                <ProductList title={"마감 임박 상품"} products={closingAuction.content} mode="carousel" />
            )}
        </div>
    );
};

export default MainPage;