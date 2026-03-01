import './ProductPage.css';
import { useState, useEffect } from "react";
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
import RatingModal from "./rating/RatingModal.jsx";

const ProductPage = () => {
    const { productId } = useParams();
    const { product, isLoading: isProductLoading } = useProductDetail(productId);
    const { mutateAsync: deleteProduct, isPending: isDeleteProductPending } = useProductDelete(productId);
    const { bidderList: bidder, isBidderLoading } = useBid(product?.auctionResponse.auctionId);
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [now, setNow] = useState(new Date());

    const isSeller = user?.nickname === product?.productDetailResponse.seller;
    const productInfo = product?.productDetailResponse || {};
    const auction = product?.auctionResponse || {};

    const startTime = new Date(auction?.startTime);
    let isStart = startTime > now;

    const endTime = new Date(auction?.endTime);
    let isEnd = endTime < now;

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleModify = () => navigate(`/product/modify/${productId}`);
    const handleDelete = () => {
        deleteProduct();
        navigate(`/`);
    };

    const handleBidClick = () => {
        if (!isLoggedIn) {
            if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                navigate('/login');
            }
        } else {
            setIsModalOpen(true);
        }
    };

    if (isProductLoading) return <div className="loading">로딩 중...</div>;

    return (
        <div className="product-page-container">
            <Breadcrumb productId={productId}/>

            <div className="product-main-content">
                {/* 1. 제목: PC에서는 오른쪽 위, 모바일에서는 맨 위 */}
                <h1 className="product-title">{productInfo.title}</h1>

                {/* 2. 이미지 섹션 */}
                <div className="product-image-wrapper">
                    <ProductImage productId={productId} />
                </div>

                {/* 3. 정보 및 액션 섹션 */}
                <div className="product-info-aside">
                    {/* 주의: ProductCount.jsx 내부의 <h1> 태그는 반드시 삭제하세요! */}
                    <ProductCount info={productInfo} bidder={bidder}/>
                    <ProductInfo info={auction} />

                    {isStart ? (
                        <AuctionCountdown key="upcoming" mode={"upcoming"} deadline={auction?.startTime} />
                    ) : (
                        <AuctionCountdown key="active" deadline={auction?.endTime} />
                    )}

                    {isSeller ? (
                        <div className="seller-buttons">
                            <button className="btn-edit" onClick={handleModify}>수정하기</button>
                            <button className="btn-delete" onClick={handleDelete} disabled={isDeleteProductPending}>
                                {isDeleteProductPending ? "삭제 중..." : "삭제"}
                            </button>
                        </div>
                    ) : (
                        <button className="add-to-cart-btn" onClick={handleBidClick} disabled={isStart || isEnd}>
                            Product Bid
                        </button>
                    )}

                    <div className="product-meta">
                        <div className="seller-info-row">
                            <span
                                className="seller-info-link"
                                onClick={() => setIsRatingModalOpen(true)}
                            >
                                <span className="label">SELLER :</span> {productInfo.seller} /
                                <span className="score"> ({Number(productInfo.ratingScore || 0).toFixed(1)})</span>
                                <span className="view-review"> [리뷰 보기]</span>
                            </span>
                        </div>
                        <SubBreadcrumb productId={productId} />
                    </div>
                </div>
            </div>

            <BidModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} auction={auction} product={productInfo} />
            <ProductTab bidder={bidder} isBidderLoading={isBidderLoading} productInfo={productInfo} />
            <RatingModal isOpen={isRatingModalOpen} onClose={() => setIsRatingModalOpen(false)} toUserId={productInfo.sellerId} />
        </div>
    );
};

export default ProductPage;