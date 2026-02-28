import { useMutation, useQueryClient} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';
import toast from 'react-hot-toast';

export const useSellerReject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({sellerId, request}) => {
            return sellerService.sellerReject({sellerId, request});
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({queryKey: ['user', 'apply', String(variables.sellerId)]});
            queryClient.invalidateQueries({queryKey: ['seller', 'list']});
            toast.success("신청 거절 성공!");
        },
    });
};