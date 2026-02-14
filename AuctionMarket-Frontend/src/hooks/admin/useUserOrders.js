import { useInfiniteQuery } from '@tanstack/react-query';
import {orderService} from '@/api/orderService.js';

export const useUserOrders = ({userId}) => {

    return useInfiniteQuery({
        queryKey: ['user', 'orders', String(userId)],
        queryFn: ({ pageParam = 0 }) =>
            orderService.adminOrders({userId, page: pageParam}),
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