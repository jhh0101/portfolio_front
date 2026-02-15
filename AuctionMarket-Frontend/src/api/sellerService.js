import api from "./axios.js";

export const sellerService = {
    sellerApply: async (request) => {
        const response = await api.post(`/user/seller/apply`, request);
        return response.data;
    },

    applyDetails: async () => {
        const response = await api.get(`/user/seller/apply`);
        return response.data;
    },

    applyCancel: async (sellerId) => {
        const response = await api.patch(`/user/${sellerId}/cancel`);
        return response.data;
    },

    applyModify: async ({sellerId, request}) => {
        const response = await api.patch(`/user/${sellerId}/modify`, request);
        return response.data;
    },

    applyList: async (searchParams) => {
        const response = await api.get(`/admin/apply/list`, {params: searchParams});
        return response.data;
    },
};