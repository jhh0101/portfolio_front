import {useMutation, useQueryClient} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';
import toast from 'react-hot-toast';

export const useApplyModify = (userId, sellerId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => {
            return sellerService.applyModify({sellerId, request})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["seller", "detail", String(userId)]});
            toast.success(`판매자 신청 수정 성공!`);
        },
    })
}