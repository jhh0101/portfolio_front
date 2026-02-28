import React, { forwardRef } from 'react';
import { Link } from "react-router-dom";

const MemberOrderList = forwardRef(({ userOrders, isFetchingNextPage }, ref) => {

    return (
        <div className="auction-list-container">
            {userOrders.map((item) => {
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
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={ref} className="loading-trigger" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isFetchingNextPage ? '로딩 중...' : null}
            </div>
        </div>
    );
});

export default MemberOrderList;