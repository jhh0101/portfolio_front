import {useQuery} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';

export const useApplyDetails = (userId, options = {}) => {

    return useQuery({
        queryKey: ["seller", "detail", String(userId)],
        queryFn: () => {
            return sellerService.applyDetails();
        },
        enabled: !!userId,
        ...options
    })
}