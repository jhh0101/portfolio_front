import {useQuery} from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';

export const useRejectReason = (userId) => {

    return useQuery({
        queryKey: ["seller", "reason", String(userId)],
        queryFn: () => {
            return sellerService.rejectReason();
        },
        enabled: !!userId,
    })
}