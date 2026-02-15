import {useMutation, useQueryClient} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';
import toast from 'react-hot-toast';

export const useApplyCancel = (userId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sellerId) => {
            return sellerService.applyCancel(sellerId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["seller", "detail", String(userId)]});
            toast.success(`판매자 신청 취소 성공!`);
        },
    })
}