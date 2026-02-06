import api from './axios.js';

export const ratingService = {
    postRating: async ({orderId, request}) => {
        const response = await api.post(`/rating/${orderId}`, request);
        return response.data;
    },
    getRating: async ({orderId}) => {
        const response = await api.get(`/rating/${orderId}/one`);
        return response.data.data || null;
    },

    updateRating: async ({orderId, ratingId, request}) => {
        const response = await api.patch(`/rating/${orderId}/update/${ratingId}`, request)
        return response.data;
    },

    deleteRating: async ({ratingId}) => {
        const response = await api.delete(`/rating/delete/${ratingId}`);
        return response.data;
    }
};