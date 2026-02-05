import {useState} from "react";
import {useProductList} from '@/hooks/product/useProductList.js'
import './ProductListPage.css';
import ProductList from "@/components/product/read/product-list/ProductList.jsx";
import Pagination from "@/components/common/pagination/Pagination.jsx";

const ProductListPage = () => {
    const [params, setParams] = useState({
        title: "",
        path: "",
        page: 0,
        size: 12,
        sort: ""
    });

    const { data, isLoading, isError } = useProductList(params);

    const products = data?.content || [];
    const pageInfo = data || {};

    if (isLoading) return <div className="loading"  style={{height: "100vh"}}>로딩 중...</div>;
    if (isError) return <div className="error">데이터를 불러오는 중 오류가 발생했습니다.</div>;

    return (
        <div className="product-list-container">
            <ProductList
                title="전체 경매 상품"
                products={products}
                mode="grid"
                params={params}
                setParams={setParams}
            />

            {products.length === 0 && !isLoading && (
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