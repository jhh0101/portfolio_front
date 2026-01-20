import React, { useState } from 'react';
import CategoryModal from './CategoryModal';
import CategorySelector from "./CategorySelector.jsx";
import './CategorySearch.css';

// CategorySearch.jsx
const CategorySearch = ({ formData, setFormData, setParams, categoryName, mode = "search" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="category-search-container">
            <div className="category-trigger" onClick={() => setIsModalOpen(true)}>
                {categoryName} <span>▼</span>
            </div>

            <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CategorySelector
                    mode={mode}
                    formData={formData}
                    setFormData={setFormData}
                    setParams={setParams}
                    onConfirm={() => setIsModalOpen(false)}
                />
            </CategoryModal>
        </div>
    );
};

export default CategorySearch;