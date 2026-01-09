import {useState} from "react";
import {productService} from "../api/productService.js";


export const useProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleError = (e, defaultMsg) => {
        const errMsg = e.response?.data?.message || defaultMsg;
        setError(errMsg);
        return e.response?.data || { success: false, message: errMsg };
    };

    const product = async (dataAll) => {
        setLoading(true);
        try {
            const response = await productService.postProduct(dataAll.productRequest, dataAll.auctionRequest);
            return response.success !== undefined ? response : response.data;
        } catch (e) {
            return handleError(e, "상품 등록 중 에러가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const productDetail = async (productId) => {
        setLoading(true);
        try {
            const response = await productService.getProduct(productId);
            return response.success !== undefined ? response : response.data;
        } catch (e) {
            return handleError(e, "상품 조회 중 에러가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const productImages = async (productId) => {
        setLoading(true);
        try {
            const images = await productService.loadImages(productId);
            return images.success !== undefined ? images : images.data;
        } catch (e) {
            return handleError(e, "이미지 조회 중 에러가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return {
        product,
        productDetail,
        productImages,
        loading,
        error
    };
};
