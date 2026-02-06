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
    }
};