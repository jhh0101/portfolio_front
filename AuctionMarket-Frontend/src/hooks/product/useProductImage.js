import { productService } from '@/api/productService.js'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

// hooks/useProductImage.js
export const useProductImage = (productId) => {
    const queryClient = useQueryClient();

    // 1. 조회 기능: productId가 있을 때만 작동 (상세/수정 페이지용)
    const loadImage = useQuery({
        queryKey: ['products', 'images', productId],
        queryFn: () => productService.loadImages(productId),
        select: (res) => {
            if (!res.success) return [];
            return [...res.data].sort((a, b) => a.imageOrder - b.imageOrder);
        },
        enabled: !!productId, // 💡 ID가 없으면 실행 안 함
    });

    // 2. 업로드 기능: 실행 시점에 ID와 데이터를 받음 (등록 페이지용)
    const uploadImage = useMutation({
        mutationFn: ({ productId: id, formData }) =>
            productService.uploadImages(id, formData),
        onSuccess: (res, variables) => {
            // 업로드 성공 시 해당 ID의 이미지 목록을 새로고침
            queryClient.invalidateQueries({
                queryKey: ['products', 'images', variables.productId]
            });
        }
    });

    return {
        images: loadImage.data || [],
        isLoading: loadImage.isLoading,
        isUploading: uploadImage.isPending,
        uploadAsync: uploadImage.mutateAsync // 💡 부모에서 await로 쓰기 위함
    };
};