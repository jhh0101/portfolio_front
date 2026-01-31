import React, { useState, useEffect } from 'react';
import { useCategory } from '@/hooks/category/useCategory';
import toast from 'react-hot-toast';

const CategorySelector = ({ setParams, onSelect, onConfirm, initialCategoryId, mode = 'register' }) => {
    const { data: categories, isLoading } = useCategory();
    const [mediumList, setMediumList] = useState([]);
    const [smallList, setSmallList] = useState([]);
    const [activeIds, setActiveIds] = useState({ large: "", medium: "", small: "" });

    const [tempSelection, setTempSelection] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // initialCategoryId가 있을 때 초기 선택 상태 설정
    useEffect(() => {
        if (categories && initialCategoryId && !isInitialized) {
            const findCategoryPath = (cats, targetId, path = []) => {
                for (const cat of cats) {
                    const newPath = [...path, cat];
                    
                    if (cat.categoryId === targetId) {
                        return newPath;
                    }
                    
                    if (cat.children && cat.children.length > 0) {
                        const result = findCategoryPath(cat.children, targetId, newPath);
                        if (result) return result;
                    }
                }
                return null;
            };

            const categoryPath = findCategoryPath(categories, initialCategoryId);

            if (categoryPath) {
                const [large, medium, small] = categoryPath;
                
                // 대분류 설정
                if (large) {
                    setActiveIds(prev => ({ ...prev, large: large.categoryId }));
                    setMediumList(large.children || []);
                    setTempSelection(large);
                }
                
                // 중분류 설정
                if (medium) {
                    setActiveIds(prev => ({ ...prev, medium: medium.categoryId }));
                    setSmallList(medium.children || []);
                    setTempSelection(medium);
                }
                
                // 소분류 설정
                if (small) {
                    setActiveIds(prev => ({ ...prev, small: small.categoryId }));
                    setTempSelection(small);
                }
                
                // 가장 하위 카테고리를 onSelect로 전달
                const selectedCategory = small || medium || large;
                if (onSelect) onSelect(selectedCategory);
                
                setIsInitialized(true);
            }
        }
    }, [categories, initialCategoryId, isInitialized, onSelect]);

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
        if (onSelect) onSelect(cat);
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
            if (mode === 'search' && setParams) {
                setParams(prev => ({ ...prev, path: tempSelection.path, page: 0 }));
            }
        } else {
            if (mode === 'search' && setParams) {
                setParams(prev => ({ ...prev, path: "", page: 0 })); // path를 초기화하여 전체 검색
            }
        }

        if (onConfirm) onConfirm();
    };



    if (isLoading) return <div className="category-loading" style={{height: "100vh"}}>로딩 중...</div>;

    return (
        <div className="category-panel-section">
            <label className="input-label">Category</label>
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
            {mode === 'search' && (
                <div className="modal-footer">
                    <button className="confirm-btn" onClick={handleConfirm}>확인</button>
                </div>
            )}
        </div>
    );
};

export default CategorySelector;