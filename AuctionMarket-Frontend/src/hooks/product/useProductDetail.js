import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {productService} from "@/api/productService.js";


export const useProductDetail = (productId) => {
    const queryClient = useQueryClient();

    // 상품 정보와 이미지를 함께 조회
    const getProduct = useQuery({
        queryKey: ['product', 'detail', String(productId)],
        queryFn: async () => {
            const productData = await productService.getProduct(productId);
            
            // 이미지 정보도 함께 가져오기
            try {
                const imageData = await productService.loadImages(productId);
                return {
                    ...productData,
                    images: imageData.data || [] // API 응답 구조에 맞게 수정
                };
            } catch (error) {
                console.error('이미지 로드 실패:', error);
                return {
                    ...productData,
                    images: []
                };
            }
        },
        enabled: !!productId,
    });

    const postProduct = useMutation({
        mutationFn: ({productRequest, auctionRequest}) =>
            productService.postProduct(productRequest, auctionRequest),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list']});
            queryClient.invalidateQueries({ queryKey: ['products', 'my']});
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