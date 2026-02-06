import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ratingService} from '@/api/ratingService.js';
import toast from 'react-hot-toast';

export const useRatingWrite = (orderId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => {
            ratingService.postRating({orderId, request})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["rating", "one", String(orderId)]});
            toast.success(`리뷰 작성 성공!`);
        },
    })
}