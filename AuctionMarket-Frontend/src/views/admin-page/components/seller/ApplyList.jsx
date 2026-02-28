import React, { useState } from 'react';
import ApplyDetailArea from './ApplyDetailArea.jsx';

const ApplyList = (apply) => {
    const [expandedId, setExpandedId] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };


    return (
        <div className="member-list-container">
            {apply.apply.map((apply) => {
                const isOpen = expandedId === apply.sellerId;
                return (
                    <div key={apply.sellerId} className="member-item-wrapper">
                        <div
                            className="member-row"
                            onClick={() => toggleExpand(apply.sellerId)}
                        >
                            <div className="member-info">
                                <h3 className="member-email">{apply.email}</h3>
                                <div className="member-meta">
                                    닉네임: {apply.nickname} · 등록일: {formatDate(apply.appliedAt)}
                                </div>
                            </div>

                            <div className="member-right-side">
                                <div className="member-badges">
                                    <span className="member-badge">
                                        Store Name : {apply.storeName}
                                    </span>
                                </div>
                                <div className={`member-arrow ${isOpen ? 'open' : ''}`}>
                                    ▼
                                </div>
                            </div>
                        </div>

                        {isOpen && (
                            <ApplyDetailArea apply={apply}/>
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default ApplyList;