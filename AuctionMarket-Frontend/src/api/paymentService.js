import api from "./axios.js";

export const paymentService = {
    confirmToss: async ({paymentKey, orderId, amount}) => {
        const response = await api.post('/payments/confirm', {paymentKey, orderId, amount});
        return response.data;
    }
}