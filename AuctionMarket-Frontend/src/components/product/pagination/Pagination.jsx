import React from 'react';
import './Pagination.css';

const Pagination = ({ pageInfo, setParams }) => {
    const { totalPages, number } = pageInfo;

    // 페이지 번호 배열 생성 (예: 1부터 totalPages까지)
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null; // 페이지가 1개 이하면 표시하지 않음

    return (
        <div className="pagination-container">
            {/* 이전 페이지 버튼 */}
            <button
                disabled={number === 0}
                onClick={() => setParams(prev => ({ ...prev, page: number - 1 }))}
                className="page-nav-btn"
            >
                &lt;
            </button>

            {/* 페이지 번호 목록 */}
            {pageNumbers.map((num) => (
                <button
                    key={num}
                    className={`page-num-btn ${number === num ? 'active' : ''}`}
                    onClick={() => setParams(prev => ({ ...prev, page: num }))}
                >
                    {num + 1}
                </button>
            ))}

            {/* 다음 페이지 버튼 */}
            <button
                disabled={number === totalPages - 1}
                onClick={() => setParams(prev => ({ ...prev, page: number + 1 }))}
                className="page-nav-btn"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;