import api from "./axios.js";

export const productService = {
    // 상품 리스트 조회
    getProducts: async (title = "", path = "", page = 0) => {
        const response = await api.get(`/product`, {params: {title, path, page}});
        return response.data;
    },

};