import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { useProduct } from "../../../hooks/useProduct.js";
import { useParams } from "react-router-dom";
import { useCategory } from "../../../hooks/useCategory.js";

const ProductPage = () => {
    const { productId } = useParams();
    const { productDetail, productImages } = useProduct();
    const { fetchCategories } = useCategory(); // 카테고리 훅 사용

    const [data, setData] = useState(null);
    const [images, setImages] = useState([]);
    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {
        const getData = async () => {
            // 1. API 호출들 (이름 안 겹치게 수정)
            const result = await productDetail(productId);
            const imgRes = await productImages(productId);
            const catMap = await fetchCategories(); // 'breadcrumb' 대신 'catMap'으로 받으세요

            if (result.success && imgRes.success && catMap) {
                setData(result.data);
                setImages(imgRes.data);

                // 2. [핵심] 브레드크럼 경로 생성 로직 추가
                const targetId = result.data.productDetailResponse.categoryId;
                const path = [];
                let currentId = targetId;

                // 부모 ID를 타고 올라가며 이름을 배열 앞에 추가
                while (currentId && catMap[currentId]) {
                    path.unshift(catMap[currentId].name);
                    currentId = catMap[currentId].parentId;
                }
                setBreadcrumb(path); // 여기서 상태를 업데이트해야 화면이 바뀝니다!

            } else {
                // 에러 메시지 처리
                const errorMsg = result.message || imgRes.message || "데이터 로드 실패";
                alert(errorMsg);
            }
        };
        getData().catch(console.error);
    }, [productId]);

    // 데이터 로딩 보호막
    if (!data || !images) {
        return <div className="loading">상품 정보와 이미지를 불러오는 중입니다...</div>;
    }

    const { productDetailResponse: product, auctionResponse: auction } = data;

    // 이미지 처리 로직
    const mainImageData = images.find(img => img.imageOrder === 1);
    const mainImageUrl = mainImageData ? mainImageData.imageUrl : "https://via.placeholder.com/600x800";

    const thumbnailImages = images
        .filter(img => img.imageOrder !== 1)
        .sort((a, b) => a.imageOrder - b.imageOrder);

    return (
        <div className="product-page-container">
            {/* 상단 브레드크럼 (동적으로 출력) */}
            <nav className="breadcrumb">
                Home &gt;
                {breadcrumb.map((name, index) => (
                    <React.Fragment key={index}>
                        {" "}{name} &gt;
                    </React.Fragment>
                ))}
                <span> {product.title}</span>
            </nav>

            <div className="product-main-content">
                {/* 왼쪽: 이미지 섹션 */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={mainImageUrl} alt="Main Image" />
                    </div>
                    <div className="thumbnail-list">
                        {thumbnailImages.map((thumb) => (
                            <img
                                key={thumb.imageId}
                                src={thumb.imageUrl}
                                alt={`Sub Image ${thumb.imageOrder}`}
                            />
                        ))}
                        {thumbnailImages.length === 0 && (
                            <span style={{ color: '#999', fontSize: '0.8rem' }}>추가 이미지가 없습니다.</span>
                        )}
                    </div>
                </div>

                {/* 오른쪽: 상품 정보 섹션 */}
                <div className="product-info-aside">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-description">{product.description}</p>

                    <div className="product-price">
                        <div className="product-price-div">
                            Start Time :
                            <span className="start-time">{new Date(auction.startTime).toLocaleString()}</span>
                        </div>
                        <div className="product-price-div">
                            End Time :
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

                    <div className="purchase-actions">
                        <button className="wishlist-btn">♡ Wishlist</button>
                    </div>

                    <button className="add-to-cart-btn">Product Bid</button>

                    <div className="product-meta">
                        <div><span>SELLER:</span> {product.seller}</div>
                        <div><span>CATEGORY:</span>
                            {breadcrumb.map((name, index) => (
                            <React.Fragment key={index}>
                                {" "} {name} &gt; {" "}
                            </React.Fragment>
                        ))}{product.title}</div>
                    </div>
                </div>
            </div>

            {/* 하단 상세 정보 탭 */}
            <div className="product-tabs">
                <div className="tab-header">
                    <span className="active">Additional Info</span>
                    <span>Questions</span>
                    <span>Reviews</span>
                </div>
                <div className="tab-content">
                    <h4>Features</h4>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;