import React, { useState, forwardRef } from 'react';
import MemberBidsModal from './MemberBidsModal.jsx'

const MemberBidList = forwardRef(({ productsAndAuctions, isFetchingNextPage, user }, ref) => {
    const [isBidListModalOpen, setIsBidListModalOpen] = useState(false);

    return (
        <div className="auction-list-container" onClick={() => setIsBidListModalOpen(true)}>
            {productsAndAuctions.map((item) => {
                const isLosing = item.auctionResponse.currentPrice > item.myMaxBidPrice;

                return (
                    <div key={`${item.productResponse.productId}`} className="auction-item-wrapper">
                        <div
                            className="auction-row"
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
                                    <span className="auction-badge">
                                        입찰가 : {item.myMaxBidPrice.toLocaleString()}원
                                    </span>
                                </div>
                            </div>
                        </div>
                        <MemberBidsModal
                            isOpen={isBidListModalOpen}
                            onClose={() => setIsBidListModalOpen(false)}
                            user={user}
                            auctionId={item.auctionResponse.auctionId}
                        />

                    </div>
                );
            })}

            <div ref={ref} className="loading-trigger" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isFetchingNextPage ? '로딩 중...' : null}
            </div>
        </div>
    );
});

export default MemberBidList;