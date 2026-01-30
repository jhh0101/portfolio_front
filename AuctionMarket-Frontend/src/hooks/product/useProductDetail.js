import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {productService} from "@/api/productService.js";


export const useProductDetail = (productId) => {
    const queryClient = useQueryClient();

    const getProduct = useQuery({
        queryKey: ['product', 'detail', String(productId)],
        queryFn: () => productService.getProduct(productId),
        enabled: !!productId,
    });

    const postProduct = useMutation({
        mutationFn: ({productRequest, auctionRequest}) =>
            productService.postProduct(productRequest, auctionRequest),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list']});
        },
    });

    return {
        product: getProduct.data,
        isLoading: getProduct.isLoading,
        isError: getProduct.isError,
        addProduct: postProduct.mutateAsync,
        isAdding: postProduct.isPending
    };
}