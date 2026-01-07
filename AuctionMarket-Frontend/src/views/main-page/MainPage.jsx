import './MainPage.css'
import MainBanner from "../../components/main-banner/MainBanner.jsx";
import ProductList from "../../components/product-list/ProductList.jsx";
import {useProducts} from "../../components/hooks/useProducts.js";

const MainPage = () => {

    const {products, loading, error, setParams} = useProducts();

    if (loading) {
        return <div>로딩 중... </div>;
    }
    if (error) {
        return <div>서버 연결에 문제가 발생했습니다.</div>
    }

    return (
        <div className="main-page">
            {/* 1. 배너 섹션 */}
            <MainBanner />
            {products.length === 0 ? (
                <p>등록된 상품이 없습니다.</p>
            ) : (
                <ProductList title="신규 경매" products={products} />
            )}
        </div>
    );
};

export default MainPage;