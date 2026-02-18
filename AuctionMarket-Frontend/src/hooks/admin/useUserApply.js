import { useQuery } from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';


export const useUserApply = (sellerId) => {

    return useQuery({
        queryKey: ['user', 'apply', String(sellerId)],
        queryFn: () =>
            sellerService.userApply(sellerId),
        enabled: !!sellerId,
    });
};