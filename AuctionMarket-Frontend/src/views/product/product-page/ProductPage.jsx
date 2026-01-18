import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { useProduct } from "../../../hooks/useProduct.js";
import { useParams } from "react-router-dom";
import { useCategory } from "../../../hooks/useCategory.js";
import AuctionCountdown from "../../../components/product/end-time/AuctionCountdown.jsx";

const ProductPage = () => {
    const { productId } = useParams();
    const { productDetail, productImages } = useProduct();
    const { fetchCategories } = useCategory();

    const [data, setData] = useState(null);
    const [images, setImages] = useState([]);
    const [breadcrumb, setBreadcrumb] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // 이미지 변경 상태

    useEffect(() => {
        const getData = async () => {
            const result = await productDetail(productId);
            const imgRes = await productImages(productId);

            // 1. 원본 트리 데이터(배열)를 가져옴
            const rawCategories = await fetchCategories();

            if (result.success && imgRes.success && rawCategories) {
                setData(result.data);

                // 이미지 정렬 및 메인 이미지 초기 설정
                const sortedImages = imgRes.data.sort((a, b) => a.imageOrder - b.imageOrder);
                setImages(sortedImages);
                const mainImg = sortedImages.find(img => img.imageOrder === 1);
                setSelectedImage(mainImg ? mainImg.imageUrl : sortedImages[0]?.imageUrl);

                // 2. [수정] 페이지 내부에서 트리 배열을 평면 객체(Map)로 즉시 변환
                const lookup = {};
                const flatten = (list) => {
                    list.forEach(cat => {
                        lookup[String(cat.categoryId)] = {
                            name: cat.category,
                            parentId: cat.parentId
                        };
                        if (cat.children) flatten(cat.children);
                    });
                };
                flatten(rawCategories);

                // 3. 브레드크럼 생성
                const targetId = result.data.productDetailResponse.categoryId;
                const path = [];
                let currentId = String(targetId);

                while (currentId && lookup[currentId]) {
                    path.unshift(lookup[currentId].name);
                    currentId = String(lookup[currentId].parentId);
                    if (currentId === "0" || currentId === "null") break;
                }
                setBreadcrumb(path);

            } else {
                console.error("데이터 로드 실패");
            }
        };
        getData().catch(console.error);
    }, [productId]);

    if (!data || !images.length) {
        return <div className="loading">상품 정보와 이미지를 불러오는 중입니다...</div>;
    }

    const { productDetailResponse: product, auctionResponse: auction } = data;

    return (
        <div className="product-page-container">
            <nav className="breadcrumb">
                <span className="path-item">Home</span>
                {breadcrumb.map((name, index) => (
                    <React.Fragment key={index}>
                        <span className="separator">&gt;</span>
                        <span className="path-item">{name}</span>
                    </React.Fragment>
                ))}
                <span className="separator">&gt;</span>
                <span>{product.title}</span>
            </nav>

            <div className="product-main-content">
                <div className="product-gallery">
                    <div className="main-image">
                        {/* 선택된 이미지 출력 */}
                        <img src={selectedImage} alt="Main Image" />
                    </div>
                    <div className="thumbnail-list">
                        {images.map((thumb) => (
                            <img
                                key={thumb.imageId}
                                src={thumb.imageUrl}
                                alt={`Sub Image ${thumb.imageOrder}`}
                                // 클릭 시 메인 이미지 변경
                                onClick={() => setSelectedImage(thumb.imageUrl)}
                                className={selectedImage === thumb.imageUrl ? "active" : ""}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info-aside">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="auction-stats-container d-flex gap-2 mb-3">
                        <div className="auction-badge view-badge">
                            🔥 조회수 {product.viewCount}
                        </div>
                        <div className="auction-badge bid-badge">
                            🔨 입찰현황 {product.viewCount}건
                        </div>
                    </div>
                    <div className="product-price">
                        <div className="product-price-div">
                            Start Time&nbsp;:
                            <span className="start-time">{new Date(auction.startTime).toLocaleString()}</span>
                        </div>
                        <div className="product-price-div">
                            End Time &nbsp; :
                            <span className="end-time">{new Date(auction.endTime).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="product-price">
                        <div className="product-price-div">
                            Start Price :
                            <span className="start-price">{auction.startPrice.toLocaleString()}원</span>
                        </div>
                        <div className="product-price-div">
                            Current Price :
                            <span className="current-price">{auction.currentPrice.toLocaleString()}원</span>
                        </div>
                    </div>
                    <AuctionCountdown deadline={new Date(auction.endTime)} />

                    <div className="purchase-actions">
                        <button className="wishlist-btn">♡ Wishlist</button>
                    </div>

                    <button className="add-to-cart-btn">Product Bid</button>

                    <div className="product-meta">
                        <div>
                            <span>SELLER : {product.seller}</span>
                        </div>
                        <div>
                            <span>CATEGORY :</span>
                            {breadcrumb.map((name, index) => (
                                <span key={index}>{""} {name} &gt; </span>
                            ))}
                            <span> {product.title} </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-tabs">
                <div className="tab-header">
                    <span className="active">Product Description</span>
                    <span>Questions</span>
                    <span>Reviews</span>
                </div>
                <div className="tab-content">
                    <h4>{product.title}</h4>
                    <br/>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;