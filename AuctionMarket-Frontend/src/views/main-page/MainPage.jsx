import './MainPage.css'
import MainBanner from "../../components/main-banner/MainBanner.jsx";
import ProductList from "../../components/product-list/ProductList.jsx";
import React from "react";
import {useMainPageData} from "../../hooks/useMainPageData.js";

const MainPage = () => {

    const {newAuction, closingAuction, isLoading, isError} = useMainPageData();

    if (isLoading) {
        return <div>로딩 중... </div>;
    }
    if (isError) {
        return <div>서버 연결에 문제가 발생했습니다.</div>
    }

    return (
        <div className="main-page">
            {/* 1. 배너 섹션 */}
            <MainBanner />
            {newAuction.products.length === 0 ? (
                <>
                    <h2 style={{marginTop: 60}}>신규 경매</h2>
                    <p>등록된 상품이 없습니다.</p>
                </>
            ) : (
                <ProductList title="신규 경매" products={newAuction.products} />
            )}
            {closingAuction.products.length === 0 ? (
                <>
                    <h2 style={{marginTop: 60}}>마감 임박 상품</h2>
                    <p>등록된 상품이 없습니다.</p>
                </>
            ) : (
                <ProductList title="마감 임박 상품" products={closingAuction.products} />
            )}
        </div>
    );
};

export default MainPage;