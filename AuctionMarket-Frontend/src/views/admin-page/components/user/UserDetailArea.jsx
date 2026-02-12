import React, { useState } from 'react';
import SuspendModal from "./SuspendModal.jsx";
import SuspendReasonModal from "./SuspendReasonModal.jsx";

const UserDetailArea = ({ user }) => {
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

    return (
        <div className="member-details">
            <div className="detail-grid">
                <div className="detail-item">
                    <span className="detail-label">이름</span>
                    <span className="detail-value">{user.username}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">전화번호</span>
                    <span className="detail-value">{user.phone}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">포인트</span>
                    <span className="detail-value">{user.point.toLocaleString()}원</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">평점</span>
                    <span className="detail-value">{user.avgRating} / 5.0</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">회원 상태</span>
                    <span className="detail-value" style={{
                        color: user.userStatus === 'NORMAL' ? '#28a745' : '#dc3545',
                        fontWeight: 'bold'
                    }}>
                        {user.userStatus}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">판매자 신청 상태</span>
                    <span className="detail-value">{user.sellerStatus || '없음'}</span>
                </div>
            </div>

            <div className="detail-actions">
                {user.userStatus === "SUSPENDED" ? (
                    <button
                        className="btn-suspend"
                        onClick={() => setIsReasonModalOpen(true)}
                    >
                        정지 사유
                    </button>
                ) : (
                    <button
                        className="btn-suspend"
                        onClick={() => setIsSuspendModalOpen(true)}
                    >
                        회원 정지
                    </button>
                )}
            </div>
            <SuspendModal
                isOpen={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                userId={user.userId}
            />
            <SuspendReasonModal
                isOpen={isReasonModalOpen}
                onClose={() => setIsReasonModalOpen(false)}
                user={user}
            />
        </div>
    );
};

export default UserDetailArea;