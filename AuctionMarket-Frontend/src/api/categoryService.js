import api from "./axios.js";

export const categoryService = {
    getAllCategories: async () => {
        const response = await api.get('/category');
        return response.data.data;
    }
};