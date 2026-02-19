import {useQuery} from '@tanstack/react-query';
import {ratingService} from '@/api/ratingService.js';

export const useRatingList = (toUserId) => {
    return useQuery({
        queryKey: ["rating", "list", String(toUserId)],
        queryFn: () => {
            return ratingService.ratingList({toUserId})
        },
        enabled: !!toUserId,

    })
}