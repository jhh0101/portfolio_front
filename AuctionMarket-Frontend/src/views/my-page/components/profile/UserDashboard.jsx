import React from 'react';
import './UserDashboard.css';

const UserDashboard = ({ user }) => {
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
                    <span className="stat-value">{user.data?.point.toLocaleString()} P</span>
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
                <span className="stat-label">Role</span>
                <span className="stat-value role-badge">{roleDisplayName}</span>
            </div>
        </div>
    );
};

export default UserDashboard;