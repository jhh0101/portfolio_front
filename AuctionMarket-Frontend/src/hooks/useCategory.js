import { useState } from 'react';
import { categoryService } from '../api/categoryService';

export const useCategory = () => {
    const [catLoading, setCatLoading] = useState(false);
    const [categoryMap, setCategoryMap] = useState({}); // 가공된 데이터 저장

    // 중첩 트리를 찾기 쉬운 평면 구조로 바꾸는 함수 (내부 로직)
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
            if (res.data.success) {
                const flatData = flatten(res.data.data);
                setCategoryMap(flatData);
                return flatData; // 가공된 지도 데이터 반환
            }
        } catch (e) {
            console.error("카테고리 로딩 실패", e);
            return null;
        } finally {
            setCatLoading(false);
        }
    };

    return { fetchCategories, categoryMap, catLoading };
};