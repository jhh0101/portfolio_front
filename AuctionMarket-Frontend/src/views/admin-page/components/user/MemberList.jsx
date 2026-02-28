import React, { useState } from 'react';
import MemberBids from '@/views/admin-page/components/bids/MemberBids.jsx'
import MemberProducts from '@/views/admin-page/components/Products/MemberProducts.jsx'
import MemberOrders from '@/views/admin-page/components/orders/MemberOrders.jsx'
import UserDetailArea from './UserDetailArea.jsx'
import './MemberList.css';

const MemberList = ({ users }) => {
    const [expandedId, setExpandedId] = useState(null);
    const [activeTab, setActiveTab] = useState('detail');

    const tabMenus = [
        { id: 'detail', label: 'Detail' },
        { id: 'products', label: 'Products' },
        { id: 'bids', label: 'Bids' },
        { id: 'won', label: 'Won Auctions' },
    ];

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="member-list-container">
            {users.map((user) => {
                const isOpen = expandedId === user.userId;

                return (
                    <div key={user.userId} className="member-item-wrapper">
                        <div
                            className="member-row"
                            onClick={() => toggleExpand(user.userId)}
                        >
                            <div className="member-info">
                                <h3 className="member-email">{user.email}</h3>
                                <div className="member-meta">
                                    닉네임: {user.nickname} · 등록일: {formatDate(user.createdAt)}
                                </div>
                            </div>

                            <div className="member-right-side">
                                <div className="member-badges">
                                    <span className="member-badge">
                                        role : {user.role}
                                    </span>
                                </div>
                                <div className={`member-arrow ${isOpen ? 'open' : ''}`}>
                                    ▼
                                </div>
                            </div>
                        </div>

                        {isOpen && (
                            <div className="horizontal-tabs">
                                <div className="member-tab-header">
                                    {tabMenus.map((tab) => (
                                        <button
                                            key={tab.id}
                                            className={`horizontal-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="member-tab-content">
                                    {activeTab === 'detail' && <UserDetailArea user={user}/>}
                                    {activeTab === 'products' && <MemberProducts user={user}/>}
                                    {activeTab === 'bids' && <MemberBids user={user}/>}
                                    {activeTab === 'won' && <MemberOrders user={user}/>}
                                </div>
                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default MemberList;

