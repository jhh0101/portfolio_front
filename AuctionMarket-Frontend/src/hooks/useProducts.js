import {useEffect, useState} from "react";
import {productService} from "../api/productService.js";

export const useProducts = ({ initialTitle = "", initialPath = "", initialSort = "" } = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [params, setParams] = useState({
        path: initialPath,
        title: initialTitle,
        sort: initialSort,
        page: 0
    })

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getProducts(params.title, params.path, params.sort, params.page);
            setProducts(response.data.content);
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
        loading,
        error,
        setParams,
        refetch: fetchProducts
    };
};
export default useProducts;