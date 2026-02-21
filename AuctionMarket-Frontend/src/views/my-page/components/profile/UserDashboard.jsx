import React, {useState} from 'react';
import './UserDashboard.css';
import RejectReasonModal from "./RejectReasonModal.jsx";
import PointPaymentButton from "@/views/my-page/components/toss/PointPaymentButton.jsx";

const UserDashboard = ({ user }) => {
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

    const isSeller = user.data?.role === 'SELLER';
    let roleDisplayName = null;

    if (isSeller){
        roleDisplayName = '판매자 (Seller)';
    } else if(user.data?.role === 'ADMIN') {
        roleDisplayName = '관리자 (Admin)';
    } else {
        roleDisplayName = '일반 회원 (Buyer)';
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-top">

                {/* 1. Point 영역: 판매자면 반반(split), 아니면 꽉차게(full) */}
                <div className={`stat-box ${isSeller ? 'split' : 'full'}`}>
                    <span className="stat-label">Point</span>
                    <div className="stat-value-group">
                        <span className="stat-value">{user.data?.point.toLocaleString()} P</span>
                        <PointPaymentButton user={user?.data} />
                    </div>
                </div>

                {/* 2. Rating 영역: 판매자일 때만 보임 */}
                {isSeller && (
                    <div className="stat-box split">
                        <span className="stat-label">Rating</span>
                        <span className="stat-value">⭐ {user.data?.avgRating}</span>
                    </div>
                )}
            </div>

            {/* --- 하단 영역 (Role) --- */}
            <div className="dashboard-bottom">
                <div className={`stat-box ${user.data?.role === 'USER' ? 'split' : 'full'}`}>
                    <span className="stat-label">Role</span>
                    <span className="stat-value role-badge">{roleDisplayName}</span>
                </div>
                {user.data?.role === 'USER' && (
                    <div className="stat-box split">
                        <span className="stat-label">Apply Status</span>
                        <span className="stat-value role-badge">
                            {user.data?.sellerStatus}
                            {user.data?.sellerStatus === 'REJECTED' && (
                                <button className={"btn btn-outline-danger ms-2"}
                                        style={{height: "30px", fontSize: "10px"}}
                                        onClick={() => setIsReasonModalOpen(true)}>
                                    거절 사유
                                </button>
                            )}
                        </span>

                    </div>
                )}
                <RejectReasonModal
                    isOpen={isReasonModalOpen}
                    onClose={() => setIsReasonModalOpen(false)}
                    user={user?.data}
                />
            </div>
        </div>
    );
};

export default UserDashboard;