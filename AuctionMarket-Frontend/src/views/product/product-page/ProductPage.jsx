import './ProductPage.css';
import { useProductDetail } from "../../../hooks/useProductDetail.js";
import { useParams } from "react-router-dom";
import AuctionCountdown from "../../../components/product/read/end-time/AuctionCountdown.jsx";
import Breadcrumb from '../../../components/product/read/breadcrumb/Breadcrumb.jsx'
import SubBreadcrumb from '../../../components/product/read/breadcrumb/SubBreadcrumb.jsx'
import ProductImage from '../../../components/image/image-load/ProductImage.jsx'
import ProductCount from '../../../components/product/read/product-count/ProductCount.jsx'
import ProductInfo from '../../../components/product/read/product-info/ProductInfo.jsx'
import ProductTab from "../../../components/product/read/product-tab/ProductTab.jsx";

const ProductPage = () => {
    const { productId } = useParams();
    const { product, isLoading: isProductLoading } = useProductDetail(productId);

    const productInfo = product?.productDetailResponse || {};
    const auction = product?.auctionResponse || {};

    if (isProductLoading) {
        return <div className="loading">로딩 중...</div>;
    }

    const endTimeDate = new Date(auction.endTime);

    return (
        <div className="product-page-container">
            <Breadcrumb productId={productId}/>

            <div className="product-main-content">
                <ProductImage productId={productId} />

                <div className="product-info-aside">
                    <ProductCount info={productInfo}/>

                    <ProductInfo info={auction} />

                    <AuctionCountdown deadline={endTimeDate} />

                    <div className="purchase-actions">
                        <button className="wishlist-btn">♡ Wishlist</button>
                    </div>

                    <button className="add-to-cart-btn">Product Bid</button>

                    <div className="product-meta">
                        <div>
                            <span>SELLER : {productInfo.seller}</span>
                        </div>
                        <SubBreadcrumb productId={productId} />
                    </div>
                </div>
            </div>

            <ProductTab info={productInfo} />

        </div>
    );
};

export default ProductPage;