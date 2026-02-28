import { useQuery } from '@tanstack/react-query';
import { bidService } from "@/api/bidService.js"

export const useMyBids = (userId, page = 0) => {
    return useQuery({
        queryKey: ['bids', 'my', String(userId), page],
        queryFn: () => bidService.myBids({page, size: 5}),
        enabled: !!userId,
        keepPreviousData: true,
    });
};
