import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {productService} from "@/api/productService.js";

export const useProductModify = (productId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({productRequest, auctionRequest}) =>
            productService.modifyProduct(productId, productRequest, auctionRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list']});
            queryClient.invalidateQueries({ queryKey: ['product', 'detail', String(productId)]});
        },
    });
}
