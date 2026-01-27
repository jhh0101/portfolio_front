import api from "./axios.js";

export const authService = {
    postLogin: async (data) => {
        const response = await api.post("/auth/login", data);
        return response.data;
    },

    refreshToken: async () => {
        const response = await api.post("/auth/refresh");
        return response.data;
    },
}