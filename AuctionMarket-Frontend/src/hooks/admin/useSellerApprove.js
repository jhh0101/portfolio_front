import { useMutation, useQueryClient} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';
import toast from 'react-hot-toast';

export const useSellerApprove = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sellerId) => {
            return sellerService.sellerApprove(sellerId);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({queryKey: ['user', 'apply', String(variables.sellerId)]});
            queryClient.invalidateQueries({queryKey: ['seller', 'list']});
            toast.success("신청 수락 성공!");
        },
    });
};