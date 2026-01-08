import api from "./axios.js";

export const productService = {
    // 상품 리스트 조회
    getProducts: async (title = "", path = "", sort = "", page = 0) => {
        const response = await api.get(`/product`, {params: {title, path, sort, page}});
        return response.data;
    },

};