import api from "./axios.js";

export const orderService = {
    myOrders: async ({page = 0, size = 5}) => {
        const response = await api.get(`/order/me`, {
            params: {
                page: page,
                size: size,
            }
        });
        return response.data;
    },

    // admin 전용
    adminOrders: async ({userId, page}) => {
        const response = await api.get(`admin/${userId}/order`, {
            params: {
                page: page,
                size: 5,
            }
        });
        return response.data;
    },
};