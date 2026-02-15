import {useMutation, useQueryClient} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';
import toast from 'react-hot-toast';

export const useSellerApply = (userId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => {
            return sellerService.sellerApply(request)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["seller", "detail", String(userId)]});
            toast.success(`판매자 신청 성공!`);
        },
    })
}