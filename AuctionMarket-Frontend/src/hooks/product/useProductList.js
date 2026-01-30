import { useQuery } from '@tanstack/react-query';
import {productService} from "@/api/productService.js";

export const useProductList = (searchParams = {}) => {

    return useQuery({
        queryKey: ['products', 'list', searchParams],
        queryFn: () => productService.getProducts(searchParams)
    });
};