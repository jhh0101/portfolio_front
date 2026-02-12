import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {useUserBidList} from '@/hooks/admin';
import './AdminModal.css';

const MemberBidsModal = ({isOpen, onClose, user, auctionId}) => {
    const { ref, inView } = useInView();
    const {
        data: userBidList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useUserBidList(user?.userId, auctionId);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (!isOpen) return null;

    const bidList = userBidList?.pages.flatMap(page => page.data.content) || [];

    if (isLoading) return <div className="loading"  style={{height: "100vh"}}>로딩 중...</div>;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content member-bids-modal"
                 style={{ width: "900px", height: "620px", overflow: "auto"}}
                 onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                    <h3>입찰 내역</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="bidder-container">
                    <div className="bidder-header">
                        <span className="col-rank">순위</span>
                        <span className="col-nick">닉네임</span>
                        <span className="col-price">입찰 가격</span>
                        <span className="col-date">입찰 날짜</span>
                        <span className="col-status">입찰 상태</span>
                    </div>

                    <div className="bidder-scroll-area">
                        {bidList.length > 0 ? (
                            bidList.map((bid, index) => (
                                <div key={bid.bidId || index} className="bidder-card">
                                    <div className="col-rank">{index + 1}</div>
                                    <div className="col-nick">{bid.nickname}</div>
                                    <div className="col-price">{bid.bidPrice.toLocaleString()}원</div>
                                    <div className="col-date">{new Date(bid.bidTime).toLocaleDateString()}</div>
                                    <div className="col-status">
                                        <span className={`status-badge ${bid.status === 'ACTIVE' ? 'active' : 'cancel'}`}>
                                            {bid.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-message" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                입찰 내역이 없습니다.
                            </div>
                        )}

                        <div ref={ref} className="loading-trigger" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {isFetchingNextPage ? '로딩 중...' : null}
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="confirm-btn" onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MemberBidsModal;