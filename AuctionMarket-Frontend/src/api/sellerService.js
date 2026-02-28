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

    rejectReason: async () => {
        const response = await api.get(`/user/reject/reason`);
        return response.data;
    },

    applyList: async (searchParams) => {
        const response = await api.get(`/admin/apply/list`, {params: searchParams});
        return response.data;
    },

    userApply: async (sellerId) => {
        const response = await api.get(`/admin/seller/${sellerId}/apply`);
        return response.data;
    },

    sellerApprove: async (sellerId) => {
        const response = await api.patch(`/admin/${sellerId}/approve`);
        return response.data;
    },

    sellerReject: async ({sellerId, request}) => {
        const payload = { rejectReason: request };
        const response = await api.patch(`/admin/${sellerId}/reject`, payload);
        return response.data;
    },

};