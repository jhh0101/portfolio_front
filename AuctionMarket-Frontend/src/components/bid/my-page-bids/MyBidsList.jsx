import React, { useState } from 'react';
import './MybidsList.css';
import BidDetailArea from '@/components/bid/my-page-bids/BidDetailArea.jsx';

const MyBidsList = ({ productsAndAuctions }) => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <div className="auction-list-container">
            {productsAndAuctions.map((item) => {
                // item.id가 경매 ID라고 가정합니다.
                const isOpen = expandedId === item.productResponse.productId;

                // [핵심] 상태 계산 로직 추가
                // 현재가가 내 입찰가보다 크면 -> 내가 밀리고 있음 (Losing)
                const isLosing = item.auctionResponse.currentPrice > item.myMaxBidPrice;

                return (
                    <div key={`${item.productResponse.productId}`} className="auction-item-wrapper">
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
                                <div className={"auction-price"}>
                                    <span
                                        className="auction-badge"
                                        style={{
                                            color: isLosing ? '#e53935' : '#2e7d32',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        현재가 : {item.auctionResponse.currentPrice.toLocaleString()}원
                                    </span>

                                    {/* 2. 내 입찰가 (보조 정보니까 연하게) */}
                                    <span
                                        className="auction-badge"
                                    >
                                        입찰가 : {item.myMaxBidPrice.toLocaleString()}원
                                    </span>
                                </div>
                                <div className="auction-arrow">{isOpen ? '▲' : '▼'}</div>
                            </div>
                        </div>

                        {isOpen && (
                            <BidDetailArea auctionId={item.auctionResponse.auctionId} productId={item.productResponse.productId} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MyBidsList;