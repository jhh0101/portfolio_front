import './ProductPage.css';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetail, useProductDelete } from "@/hooks/product";
import { useBid } from "@/hooks/bid";
import { useAuth } from "@/context/AuthContext.jsx";
import AuctionCountdown from "@/components/product/read/end-time/AuctionCountdown.jsx";
import ProductCount from '@/components/product/read/product-count/ProductCount.jsx'
import { Breadcrumb, SubBreadcrumb } from '@/views/product/product-page/product/breadcrumb';
import ProductInfo from '@/views/product/product-page/product/product-info/ProductInfo.jsx'
import ProductTab from "@/views/product/product-page/product/product-tab/ProductTab.jsx";
import BidModal from "@/views/product/product-page/bid/BidModal.jsx";
import ProductImage from '@/views/product/product-page/image-load/ProductImage.jsx';


const ProductPage = () => {
    const { productId } = useParams();
    const { product, isLoading: isProductLoading } = useProductDetail(productId);
    const { mutateAsync: deleteProduct, isPending: isDeleteProductPending  } = useProductDelete(productId);
    const { bidderList: bidder, isBidderLoading } = useBid(product?.auctionResponse.auctionId);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoggedIn, user } = useAuth();

    const isSeller = user?.nickname === product?.productDetailResponse.seller;

    const productInfo = product?.productDetailResponse || {};
    const auction = product?.auctionResponse || {};


    const handleModify = () => {
        navigate(`/product/modify/${productId}`);
    };

    const handleDelete = () => {
        deleteProduct();
        navigate(`/`);
    };

    const handleBidClick = () => {
        if (!isLoggedIn) {
            if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                navigate('/login');
            } else {
                return;
            }
        } else {
            setIsModalOpen(true);
        }
    };

    if (isProductLoading) {
        return <div className="loading" style={{height: "100vh", alignItem: "center"}}>로딩 중...</div>;
    }

    const endTimeDate = new Date(auction.endTime);

    return (
        <div className="product-page-container">
            <Breadcrumb productId={productId}/>

            <div className="product-main-content">
                <ProductImage productId={productId} />

                <div className="product-info-aside">
                    <ProductCount info={productInfo} bidder={bidder}/>

                    <ProductInfo info={auction} />

                    <AuctionCountdown deadline={endTimeDate} />
                    {isSeller ? (
                        <div className="seller-buttons">
                            <button className="btn-edit" onClick={handleModify}>
                                수정하기
                            </button>
                            <button className="btn-delete" onClick={handleDelete} disabled={isDeleteProductPending}>
                                {isDeleteProductPending ? "삭제 중..." : "삭제"}
                            </button>
                        </div>
                    ) : (
                        <button className="add-to-cart-btn" onClick={handleBidClick}>Product Bid</button>
                    )}
                    <BidModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        auction={auction}
                        product={productInfo}
                    />

                    <div className="product-meta">
                        <div>
                            <span>SELLER : {productInfo.seller}</span>
                        </div>
                        <SubBreadcrumb productId={productId} />
                    </div>
                </div>
            </div>

            <ProductTab bidder={bidder} isBidderLoading={isBidderLoading} productInfo={productInfo} />

        </div>
    );
};

export default ProductPage;