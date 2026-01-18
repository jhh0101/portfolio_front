import React from "react";
import './ProductListPage.css';
import ProductList from "../../../components/product/product-list/ProductList.jsx";
import useProducts from "../../../hooks/useProducts.js";
import Pagination from "../../../components/product/pagination/Pagination.jsx";

const ProductListPage = () => {
    // 1. useProducts 훅을 통해 상품 데이터와 파라미터 변경 함수를 가져옴
    const { products, pageInfo, error, loading, setParams } = useProducts({
        initialPath: ""
    });

    if (loading && products.length === 0) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">데이터를 불러오는 중 오류가 발생했습니다.</div>;

    return (
        <div className="product-list-container">
            {/* 2. setParams를 ProductList로 전달 */}
            <ProductList
                title="전체 경매 상품"
                products={products}
                mode="grid"
                setParams={setParams}
            />

            {products.length === 0 && !loading && (
                <div className="empty-msg">해당 제목이나 카테고리에 상품이 없습니다.</div>
            )}

            <Pagination
                pageInfo={pageInfo}
                setParams={setParams}
            />
        </div>
    );
};

export default ProductListPage;