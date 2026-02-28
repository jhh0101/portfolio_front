import { useInfiniteQuery } from '@tanstack/react-query';
import {bidService} from '@/api/bidService.js';

export const useUserBids = (userId) => {

    return useInfiniteQuery({
        queryKey: ['user', 'bids', String(userId)],
        queryFn: ({ pageParam = 0 }) =>
            bidService.userBids({userId, page: pageParam}),
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