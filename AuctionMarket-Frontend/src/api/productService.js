import api from "./axios.js";

export const productService = {
    // 상품 리스트 조회
    getProducts: async (searchParams) => {
        const response = await api.get(`/product`, {params: searchParams});
        return response.data.data;
    },

    getProduct: async (productId) => {
        const response = await api.get(`/product/${productId}`);
        return response.data.data;
    },

    postProduct: async (productData, auctionData) => {
        const requestBody = {
            productRequest: productData,
            auctionRequest: auctionData
        }
        const response = await api.post(`/product`, requestBody);
        return response.data;
    },

    // 2. 이미지 다중 업로드 (Multipart)
    uploadImages: async (productId, files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        return await api.post(`/product/${productId}/images`, formData);
    },

    loadImages: async (productId) => {
        const images = await api.get(`/product/${productId}/images`);
        return images.data;
    }

};