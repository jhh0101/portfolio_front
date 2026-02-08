import { useQuery } from '@tanstack/react-query';
import {productService} from "@/api/productService.js";

export const useMyProducts = (userId, searchParams = {}) => {

    return useQuery({
        queryKey: ['products', 'my', String(userId), searchParams],
        queryFn: () => productService.myProducts(searchParams)
    });
};