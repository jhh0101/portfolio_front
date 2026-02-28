import { useInfiniteQuery } from '@tanstack/react-query';
import {bidService} from '@/api/bidService.js';

export const useUserBidList = (userId, auctionId) => {

    return useInfiniteQuery({
        queryKey: ['user', 'bidList', String(userId)],
        queryFn: ({ pageParam = 0 }) =>
            bidService.userBidList({userId, auctionId, page: pageParam}),
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