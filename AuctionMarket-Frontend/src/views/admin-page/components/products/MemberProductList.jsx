import React, { forwardRef } from 'react';
import { Link } from "react-router-dom";

const MemberProductList = forwardRef(({ productsAndAuctions, isFetchingNextPage }, ref) => {

    return (
        <div className="auction-list-container">
            {productsAndAuctions?.map((item) => {
                const isEnded = item.productResponse.productStatus === "FAILED" || item.productResponse.productStatus === "SOLD";

                return (
                    <Link key={item.productResponse.productId} to={`/product/${item.productResponse.productId}`} style={{textDecoration: "none"}}>
                        <div className="auction-item-wrapper">
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
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
            <div ref={ref} className="loading-trigger" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isFetchingNextPage ? '로딩 중...' : null}
            </div>
        </div>
    );
});

export default MemberProductList;