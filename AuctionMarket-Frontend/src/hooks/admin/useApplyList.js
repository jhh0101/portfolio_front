import { useQuery } from '@tanstack/react-query';
import {sellerService} from '@/api/sellerService.js';


export const useApplyList = (searchParams = {}) => {

    return useQuery({
        queryKey: ['seller', 'list', searchParams],
        queryFn: () => sellerService.applyList(searchParams)
    });
};