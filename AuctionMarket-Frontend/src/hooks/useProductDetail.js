import { useQuery } from '@tanstack/react-query';
import {productService} from "../api/productService.js";


export const useProductDetail = (productId) => {
    return useQuery({
        queryKey: ['products', 'detail', productId],
        queryFn: () => productService.getProduct(productId),
        enabled: !!productId,
    });
}