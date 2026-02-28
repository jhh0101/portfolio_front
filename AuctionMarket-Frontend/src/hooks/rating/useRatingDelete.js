import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ratingService} from '@/api/ratingService.js';
import toast from 'react-hot-toast';

export const useRatingDelete = (orderId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ratingId) => {
            ratingService.deleteRating({ratingId})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["rating", "one", String(orderId)]});
            toast.success(`리뷰 삭제 성공!`);
        },
    })
}