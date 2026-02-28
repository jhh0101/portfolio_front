import { useInfiniteQuery } from '@tanstack/react-query';
import {productService} from '@/api/productService.js';

export const useUserProducts = ({userId, searchParams = {}}) => {

    return useInfiniteQuery({
        queryKey: ['user', 'products', String(userId), searchParams],
        queryFn: ({ pageParam = 0 }) =>
            productService.adminProducts({userId, page: pageParam, searchParams}),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const sliceData = lastPage.data;

            if (sliceData.last === false) {
                return sliceData.number + 1;
            }
            return undefined;
        },
        enabled: !!userId,
    });
};