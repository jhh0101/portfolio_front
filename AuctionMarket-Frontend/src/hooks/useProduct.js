import {useState} from "react";
import {productService} from "../api/productService.js";


export const useProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const product = async (dataAll) => {
        setLoading(true);
        try {
            const response = await productService.postProduct(dataAll.productRequest, dataAll.auctionRequest);
            return response.success !== undefined ? response : response.data;
        } catch (e) {
            console.error("상품 등록 에러 상세:", e);

            const errorData = e.response?.data;
            const errMsg = errorData?.message || "상품 등록 중 에러가 발생했습니다.";

            setError(errMsg);

            return errorData || {success: false, message: errMsg};
        } finally {
            setLoading(false);
        }
    };
    return {
        product,
        loading,
        error
    };
};
