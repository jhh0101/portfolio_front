import {useEffect, useState} from "react";
import {productService} from "../api/productService.js";

export const useProducts = ({ initialTitle = "", initialPath = "", initialSort = "", initialSize = 0 } = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // [추가] 페이지네이션 정보를 저장할 상태
    const [pageInfo, setPageInfo] = useState({
        totalPages: 0,
        totalElements: 0,
        number: 0, // 현재 페이지 (0부터 시작)
    });

    const [params, setParams] = useState({
        path: initialPath,
        title: initialTitle,
        sort: initialSort,
        size: initialSize,
        page: 0
    })

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getProducts(params.title, params.path, params.sort, params.page, params.size);

            // [수정] content 뿐만 아니라 전체 응답 데이터를 활용
            setProducts(response.data.content);
            setPageInfo({
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                number: response.data.number
            });
        } catch (e) {
            console.error("데이터 로딩 에러:", e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts().catch(console.error)
    }, [params]);

    return {
        products,
        pageInfo,
        loading,
        error,
        setParams,
        refetch: fetchProducts
    };
};

export default useProducts;