import React, { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import './CategorySelector.css';

const CategorySelector = ({ setParams, onSelect, onConfirm, mode = 'register' }) => {
    const { data: categories, isLoading } = useCategory();
    const [mediumList, setMediumList] = useState([]);
    const [smallList, setSmallList] = useState([]);
    const [activeIds, setActiveIds] = useState({ large: "", medium: "", small: "" });

    const [tempSelection, setTempSelection] = useState(null);

    const handleCategoryClick = (cat) => {
        setTempSelection(cat);
        if (onSelect) onSelect(cat.category);
    };

    const handleLargeSelect = (cat) => {
        setActiveIds({ large: cat.categoryId, medium: "", small: "" });
        setMediumList(cat.children || []);
        setSmallList([]);
        handleCategoryClick(cat);
    };

    const handleMediumSelect = (cat) => {
        setActiveIds(prev => ({ ...prev, medium: cat.categoryId, small: "" }));
        setSmallList(cat.children || []);
        handleCategoryClick(cat);
    };

    const handleSmallSelect = (cat) => {
        setActiveIds(prev => ({ ...prev, small: cat.categoryId }));
        handleCategoryClick(cat);
    };

    const handleSelectAll = () => {
        setActiveIds({ large: "", medium: "", small: "" });
        setMediumList([]);
        setSmallList([]);
        setTempSelection(null);
        if (onSelect) onSelect("전체 카테고리");
    };

    const handleConfirm = () => {
        if (tempSelection) {
            // 특정 카테고리 선택 시
            if (mode === 'search' && setParams) {
                setParams(prev => ({ ...prev, path: tempSelection.path, page: 0 }));
            }
        } else {
            // 💡 [수정] "전체 카테고리"를 선택한 상태에서 확인을 누른 경우
            if (mode === 'search' && setParams) {
                setParams(prev => ({ ...prev, path: "", page: 0 })); // path를 초기화하여 전체 검색
            }
        }

        if (onConfirm) onConfirm(); // 모달 닫기
    };

    if (isLoading) return <div className="category-loading">로딩 중...</div>;

    return (
        <div className="category-panel-section">
            <div className="category-panel-wrapper">
                <div className="cat-column">
                    <div className="cat-header">대분류</div>
                    <ul className="cat-list">
                        <li className={activeIds.large === "" ? 'selected' : ''}
                            onClick={handleSelectAll}> 전체 카테고리</li>
                        {categories?.map(c => (
                            <li key={c.categoryId} className={activeIds.large === c.categoryId ? 'selected' : ''} onClick={() => handleLargeSelect(c)}>{c.category}</li>
                        ))}
                    </ul>
                </div>
                <div className="cat-column">
                    <div className="cat-header">중분류</div>
                    <ul className="cat-list">
                        {mediumList.length > 0 ? mediumList.map(c => (
                            <li key={c.categoryId} className={activeIds.medium === c.categoryId ? 'selected' : ''} onClick={() => handleMediumSelect(c)}>{c.category}</li>
                        )) : <li className="empty">선택 대기</li>}
                    </ul>
                </div>
                <div className="cat-column">
                    <div className="cat-header">소분류</div>
                    <ul className="cat-list">
                        {smallList.length > 0 ? smallList.map(c => (
                            <li key={c.categoryId} className={activeIds.small === c.categoryId ? 'selected' : ''} onClick={() => handleSmallSelect(c)}>{c.category}</li>
                        )) : <li className="empty">선택 대기</li>}
                    </ul>
                </div>
            </div>
            <div className="category-footer">
                <button className="category-confirm-btn" onClick={handleConfirm}>확인</button>
            </div>
        </div>
    );
};

export default CategorySelector;