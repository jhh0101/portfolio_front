import api from "./axios.js";

export const loginService = {
    postLogin: async (data) => {
        return await api.post("/auth/login", data);
    }
}