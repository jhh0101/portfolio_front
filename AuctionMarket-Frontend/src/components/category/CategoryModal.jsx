import React from 'react';
import './CategoryModal.css';

const CategoryModal = ({ isOpen, onClose, children }) => {
    // 모달이 닫혀있으면 아무것도 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* stopPropagation은 클릭 이벤트가 배경으로 전달되어 모달이 닫히는 것을 방지함 */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>카테고리 선택</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children} {/* 여기에 직접 만드신 카테고리 컴포넌트가 들어감 */}
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;