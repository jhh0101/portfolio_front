import { useQuery } from '@tanstack/react-query';
import {productService} from "../api/productService.js";

export const useProductList = (searchParams = {}) => {
    const {title = "", path = "", sort = "", size = 0} = searchParams;

    return useQuery({
        queryKey: ['products', 'list', searchParams],
        queryFn: () => productService.getProducts(searchParams)
    });
};

export default useProductList;