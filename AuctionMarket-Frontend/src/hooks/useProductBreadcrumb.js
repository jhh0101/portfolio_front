import { useMemo } from 'react';
import { useProductDetail } from "./useProductDetail.js";
import { useCategoryLookup } from "./useCategoryLookup.js";

export const useProductBreadcrumb = (productId) => {
    const { product, isLoading: isProductLoading } = useProductDetail(productId);
    const { data: categoryLookup } = useCategoryLookup();

    const breadcrumb = useMemo(() => {
        if (!product || !categoryLookup) return [];

        const path = [];
        let currentId = String(product.productDetailResponse?.categoryId);

        while (currentId && categoryLookup[currentId]) {
            path.unshift(categoryLookup[currentId].name);
            currentId = String(categoryLookup[currentId].parentId);
            if (currentId === "0" || currentId === "null" || !currentId) break;
        }
        return path;
    }, [product, categoryLookup]);

    return {
        breadcrumb,
        productTitle: product?.productDetailResponse?.title,
        isLoading: isProductLoading
    };
};