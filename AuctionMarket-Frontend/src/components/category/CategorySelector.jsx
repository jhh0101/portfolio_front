import React, { useState, useEffect } from 'react';
import { useCategory } from '../../hooks/useCategory';

const CategorySelector = ({ formData, setFormData }) => {
    const { fetchCategories, categories, catLoading } = useCategory();
    const [mediumList, setMediumList] = useState([]);
    const [smallList, setSmallList] = useState([]);

    // 현재 UI상에서 강조 표시를 위한 상태
    const [activeIds, setActiveIds] = useState({ large: "", medium: "" });

    useEffect(() => {
        fetchCategories();
    }, []);

    // 1단계: 대분류 선택
    const handleLargeSelect = (id) => {
        setActiveIds({ large: id, medium: "" });
        setSmallList([]);
        const target = categories.find(c => c.categoryId === id);
        setMediumList(target?.children || []);
        setFormData(prev => ({ ...prev, categoryId: "" })); // 최종값 초기화
    };

    // 2단계: 중분류 선택
    const handleMediumSelect = (id) => {
        setActiveIds(prev => ({ ...prev, medium: id }));
        const target = mediumList.find(c => c.categoryId === id);
        setSmallList(target?.children || []);
        setFormData(prev => ({ ...prev, categoryId: "" }));
    };

    // 3단계: 소분류 선택 (최종 데이터 저장)
    const handleSmallSelect = (id) => {
        setFormData(prev => ({ ...prev, categoryId: id }));
    };

    if (catLoading) return <div className="category-loading">카테고리 로딩 중...</div>;

    return (
        <div className="category-panel-section">
            <label className="section-label">Category</label>
            <div className="category-panel-wrapper">
                {/* 대분류 */}
                <div className="cat-column">
                    <div className="cat-header">대분류</div>
                    <ul className="cat-list">
                        {categories.map(c => (
                            <li key={c.categoryId} className={activeIds.large === c.categoryId ? 'selected' : ''} onClick={() => handleLargeSelect(c.categoryId)}>
                                {c.category}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* 중분류 */}
                <div className="cat-column">
                    <div className="cat-header">중분류</div>
                    <ul className="cat-list">
                        {mediumList.length > 0 ? (
                            mediumList.map(c => <li key={c.categoryId} className={activeIds.medium === c.categoryId ? 'selected' : ''} onClick={() => handleMediumSelect(c.categoryId)}>{c.category}</li>)
                        ) : <li className="empty">선택 대기</li>}
                    </ul>
                </div>
                {/* 소분류 */}
                <div className="cat-column">
                    <div className="cat-header">소분류</div>
                    <ul className="cat-list">
                        {smallList.length > 0 ? (
                            smallList.map(c => <li key={c.categoryId} className={formData.categoryId === c.categoryId ? 'selected' : ''} onClick={() => handleSmallSelect(c.categoryId)}>{c.category}</li>)
                        ) : <li className="empty">선택 대기</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategorySelector;