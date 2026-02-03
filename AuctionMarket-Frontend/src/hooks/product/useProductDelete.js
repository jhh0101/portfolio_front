import { useMutation, useQueryClient } from '@tanstack/react-query';
import {productService} from "@/api/productService.js";

export const useProductDelete = (productId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
            productService.deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products', 'list']});
        },
    });
};