import { productService } from '@/api/productService.js'
import {useMutation, useQueryClient} from '@tanstack/react-query'

export const useProductImageDelete = (productId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (imageId) =>
            productService.deleteImages(imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products', 'images', productId]
            });
            queryClient.invalidateQueries({
                queryKey: ['product', 'detail', String(productId)],
            });
        }
    });

};