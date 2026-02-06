import {useQuery} from '@tanstack/react-query';
import {ratingService} from '@/api/ratingService.js';
import toast from 'react-hot-toast';

export const useRatingRead = (orderId) => {
    return useQuery({
        queryKey: ["rating", "one", String(orderId)],
        queryFn: () => {
            return ratingService.getRating({orderId})
        },
        enabled: !!orderId,

    })
}