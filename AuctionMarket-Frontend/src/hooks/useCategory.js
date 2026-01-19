import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService';

export const useCategory = () => {
    return useQuery({
        queryKey: ['categories', 'tree'],
        queryFn: () => categoryService.getAllCategories(),
        // 💡 select는 서버 데이터를 컴포넌트에 전달하기 직전에 가공하는 역할입니다.
        select: (response) => {
            const rawCategories = response; // 서버 응답 구조에 맞게 조정
            const lookup = {};

            const flatten = (list) => {
                list.forEach(cat => {
                    lookup[String(cat.categoryId)] = {
                        name: cat.category,
                        parentId: cat.parentId
                    };
                    if (cat.children && cat.children.length > 0) {
                        flatten(cat.children);
                    }
                });
            };

            flatten(rawCategories);
            return lookup; // 이제 이 훅의 data는 변환된 lookup 객체가 됩니다.
        },
        staleTime: 1000 * 60 * 60, // 카테고리는 자주 안 변하니 1시간 동안 캐시 유지
    });
};