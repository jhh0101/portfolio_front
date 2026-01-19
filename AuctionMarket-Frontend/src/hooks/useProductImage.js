import { productService } from '../api/productService.js'
import {useQuery} from '@tanstack/react-query'

export const useProductImage = (productId) => {
    return useQuery({
        queryKey: ['products', 'images', productId],
        queryFn: () => productService.loadImages(productId),
        select: (res) => {
            if (!res.success) return [];
            // 💡 컴포넌트 밖에서 미리 정렬해서 전달
            return [...res.data].sort((a, b) => a.imageOrder - b.imageOrder);
        },
        enabled: !!productId,
    });
};