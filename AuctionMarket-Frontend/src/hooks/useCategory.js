import { useState } from 'react';
import { categoryService } from '../api/categoryService';

export const useCategory = () => {
    const [catLoading, setCatLoading] = useState(false);
    const [categories, setCategories] = useState([]); // 원본 트리 데이터 (선택용)
    const [categoryMap, setCategoryMap] = useState({}); // 평면 데이터 (조회용)

    const flatten = (list, res = {}) => {
        list.forEach(cat => {
            res[cat.categoryId] = { name: cat.category, parentId: cat.parentId };
            if (cat.children) flatten(cat.children, res);
        });
        return res;
    };

    const fetchCategories = async () => {
        setCatLoading(true);
        try {
            const res = await categoryService.getAllCategories();
            // 지난번 데이터 구조에 맞춰 res.data.data 확인
            if (res.data && res.data.success) {
                const rawData = res.data.data;
                setCategories(rawData); // 트리 구조 저장
                setCategoryMap(flatten(rawData)); // 평면 구조 저장
                return rawData;
            }
        } catch (e) {
            console.error("카테고리 로딩 실패", e);
        } finally {
            setCatLoading(false);
        }
    };

    return { fetchCategories, categories, categoryMap, catLoading };
};