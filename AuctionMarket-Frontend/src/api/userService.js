import api from "./axios.js";

export const userService =  {
    postSignup: async (data) => {
        const response = await api.post("/user/signup", data);
        return response.data;
    },

    getProfile: async (userId) => {
        const response = await api.get(`/user/${userId}/profile`);
        return response.data;
    },

    updateProfile: async (userId, updateRequest) => {
        const response = await api.patch(`/user/${userId}/profile`, updateRequest);
        return response.data;
    },

    updatePassword: async (userId, updatePasswordRequest) => {
        const response = await api.patch(`/user/${userId}/new-password`, updatePasswordRequest);
        return response.data;
    }
}