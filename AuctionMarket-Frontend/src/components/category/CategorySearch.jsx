import React, { useState } from 'react';
import CategoryModal from './CategoryModal';
import CategorySelector from "./CategorySelector.jsx";
import './CategorySearch.css';

// CategorySearch.jsx
const CategorySearch = ({ formData, setFormData, setParams, mode = "search" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPathName, setSelectedPathName] = useState("전체 카테고리");

    return (
        <div className="category-search-container">
            <div className="category-trigger" onClick={() => setIsModalOpen(true)}>
                {selectedPathName} <span>▼</span>
            </div>

            <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CategorySelector
                    mode={mode}
                    formData={formData}
                    setFormData={setFormData}
                    setParams={setParams}
                    onSelect={(name) => setSelectedPathName(name)}
                    onConfirm={() => setIsModalOpen(false)}
                />
            </CategoryModal>
        </div>
    );
};

export default CategorySearch;