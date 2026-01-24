import React from 'react';
import {TERMS_DATA, PRIVACY_DATA} from "@/constants/policyData.js";
import './PolicyPage.css'

const PolicyPage = ({ type }) => {
    const selectedData = type === 'terms' ? TERMS_DATA : PRIVACY_DATA;

    return (
        <div className="policy-wrapper py-5">
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 className="policy-main-title mb-5 text-black fw-bold">
                    {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </h2>

                {selectedData.map((item) => (
                    <div key={item.id} className="article-card mb-5">
                        {/* 조항 제목 - 카드 밖으로 빼서 강조 */}
                        <h4 className="article-title text-white mb-3 fw-bold">
                            {item.title}
                        </h4>

                        {/* 개별 스크롤 박스 */}
                        <div className="article-content-box">
                            <p className="article-text">
                                {item.content}
                            </p>

                            {item.list && (
                                <ul className="article-list mt-3">
                                    {item.list.map((line, index) => (
                                        <li key={index}>{line}</li>
                                    ))}
                                </ul>
                            )}

                            {item.highlights && (
                                <div className="article-tags mt-3 d-flex gap-2">
                                    {item.highlights.map((tag, index) => (
                                        <span key={index} className="tag-item">#{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PolicyPage;