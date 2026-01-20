import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService';

export const useCategory = (options = {}) => {
    return useQuery({
        queryKey: ['categories', 'tree'],
        queryFn: () => categoryService.getAllCategories(),
        staleTime: 1000 * 60 * 60, // 카테고리는 자주 안 변하니 1시간 동안 캐시 유지
        ...options
    });
};