import { useState } from 'react';
import {useRatingList} from "@/hooks/rating";
import Pagination from "@/components/common/pagination/Pagination.jsx";
import RatingList from './RatingList.jsx';
import './RatingModal.css';

const RatingModal = ({ isOpen, onClose, toUserId }) => {
    const {data: ratingList} = useRatingList(toUserId);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{width: "1150px", height: "720px"}} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>리뷰</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="bidder-container">
                        <div className="bidder-header">
                            <div className="header-col from">작성자</div>
                            <div className="header-col product">상품명</div>
                            <div className="header-col comment">Comment</div>
                            <div className="header-col score">Score</div>
                        </div>

                        <div className="bidder-scroll-area">
                            {ratingList?.data?.content?.length > 0 ? (
                                ratingList.data.content.map((rating) => (
                                    <RatingList
                                        key={rating.ratingId}
                                        rating={rating}
                                    />
                                ))
                            ) : (
                                <div className="empty-message">리뷰가 없습니다!</div>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                        <Pagination pageInfo={{totalPages: ratingList.data?.totalPages, number: ratingList.data?.number}} />
                    </div>

                </div>
                <div className="modal-footer">
                    <button className="confirm-btn" style={{margin: "5px 20px 20px", width: "100%"}} onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;