import React, { useState } from 'react';
import './WonAuctionsList.css';
import RatingWriteModal from "@/views/my-page/components/orders/rating/RatingWriteModal.jsx";

const WonAuctionsList = ({ myOrders }) => {
    const [expandedId, setExpandedId] = useState(null);

    const openReviewModal = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <div className="auction-list-container">
            {myOrders.map((item) => {
                const isOpen = expandedId === item.productId;

                return (
                    <div key={`${item.productId}`} className="auction-item-wrapper">
                        <div
                            className="auction-row"
                        >
                            <img
                                src={item.mainImageUrl || "https://via.placeholder.com/80"}
                                alt={item.title}
                                className="auction-image"
                            />
                            <div className="auction-info">
                                <div className="auction-category">{item.category}</div>
                                <h3 className="auction-title">{item.title}</h3>
                                <div className="auction-meta">
                                    판매자: {item.seller} · 종료일: {new Date(item.endTime).toLocaleDateString()}
                                </div>
                            </div>

                            {/* 오른쪽 가격 영역 */}
                            <div className="auction-right-side">
                                <div className={"auction-price"}>

                                    <span
                                        className="auction-badge"
                                    >
                                        최종 입찰가 : {item.finalPrice.toLocaleString()}원
                                    </span>
                                </div>
                                <button
                                    className="btn-review-write"
                                    onClick={() => openReviewModal(item.productId)}
                                >
                                    리뷰 작성하기
                                </button>
                            </div>
                        </div>

                        {isOpen && (
                            <RatingWriteModal
                                isOpen={isOpen}
                                onClose={() => setExpandedId(null)}
                                product={item}
                            />

                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default WonAuctionsList;