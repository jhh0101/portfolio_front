import React, { useState } from 'react';

import BidDetailArea from '@/components/bid/my-page-bids/BidDetailArea.jsx';

const MyProductList = ({ productsAndAuctions }) => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <div className="auction-list-container">
            {productsAndAuctions?.map((item) => {
                // 1. 변수 선언부 (리팩토링 전이라도 로직은 여기 두는 게 깔끔합니다)
                const isOpen = expandedId === item.productResponse.productId;
                const isEnded = item.productResponse.productStatus === "FAILED" || item.productResponse.productStatus === "SOLD";

                // 2. 내부 return (map 함수가 반환하는 JSX)
                return (
                    <div key={item.productResponse.productId} className="auction-item-wrapper">
                        <div
                            className="auction-row"
                            onClick={() => toggleExpand(item.productResponse.productId)}
                        >
                            <img
                                src={item.productResponse.mainImageUrl || "https://via.placeholder.com/80"}
                                alt={item.productResponse.title}
                                className="auction-image"
                            />
                            <div className="auction-info">
                                <div className="auction-category">{item.productResponse.category}</div>
                                <h3 className="auction-title">{item.productResponse.title}</h3>
                                <div className="auction-meta">
                                    판매자: {item.productResponse.seller} · 등록일: {new Date(item.productResponse.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            {/* 오른쪽 가격 영역 */}
                            <div className="auction-right-side">
                                <div className="auction-price">
                                    {isEnded ? (
                                        <span
                                            className="auction-badge"
                                            style={{ fontWeight: 'bold', color: '#888' }} // 종료된 건 회색 처리 추천
                                        >
                                        종료된 경매입니다.
                                    </span>
                                    ) : (
                                        <span
                                            className="auction-badge"
                                            style={{ fontWeight: 'bold', color: '#ff5722' }} // 진행 중인 건 강조색
                                        >
                                        현재가 : {item.auctionResponse.currentPrice.toLocaleString()}원
                                    </span>
                                    )}
                                </div>
                                <div className="auction-arrow">{isOpen ? '▲' : '▼'}</div>
                            </div>
                        </div>

                        {/* 상세 내용 (조건부 렌더링) */}
                        {isOpen && (
                            <BidDetailArea
                                auctionId={item.auctionResponse.auctionId}
                                productId={item.productResponse.productId}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MyProductList;