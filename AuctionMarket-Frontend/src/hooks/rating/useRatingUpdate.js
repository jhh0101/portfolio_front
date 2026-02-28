import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ratingService} from '@/api/ratingService.js';
import toast from 'react-hot-toast';

export const useRatingUpdate = (orderId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ratingId, payload}) => {
            ratingService.updateRating({orderId, ratingId, request: payload})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["rating", "one", String(orderId)]});
            toast.success(`리뷰 수정 성공!`);
        },
    })
}