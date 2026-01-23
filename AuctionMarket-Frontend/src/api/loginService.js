import api from "./axios.js";

export const loginService = {
    postLogin: async (data) => {
        const response = await api.post("/auth/login", data);
        return response.data;
    }
}