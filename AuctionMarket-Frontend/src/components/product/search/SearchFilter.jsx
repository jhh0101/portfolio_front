import React, { useState, useEffect } from 'react';
import CategorySearch from "@/components/category/CategorySearch.jsx";

const SearchFilter = ({ params, setParams, categoryName }) => {
    const [searchTitle, setSearchTitle] = useState(params.title || "");

    useEffect(() => {
        setSearchTitle(params.title || "");
    }, [params.title]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setParams(prev => ({ ...prev, title: searchTitle, page: 0 }));
        }
    };

    const handleSortChange = (e) => {
        setParams(prev => ({ ...prev, sort: e.target.value, page: 0 }));
    };

    return (
        <div className="search-filter-section">
            <div className="title-search-bar">
                <input
                    type="text"
                    placeholder="상품명 검색..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
            <div className="filter-spacer">
                <CategorySearch setParams={setParams} categoryName={categoryName} />
            </div>
            <div className="sort-filter-wrapper">
                <select className="sort-select" onChange={handleSortChange} value={params?.sort || "createdAt"}>
                    <option value="createdAt">최신 등록순</option>
                    <option value="endingSoon">마감 임박순</option>
                    <option value="priceLow">최저가순</option>
                    <option value="priceHight">최고가순</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;