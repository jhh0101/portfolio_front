import api from "./axios.js";

export const userService =  {
    postSignup: async (data) => {
        const response = await api.post("/user/signup", data);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get(`/user/my/profile`);
        return response.data;
    },

    updateProfile: async (updateRequest) => {
        const response = await api.patch(`/user/my/profile/edit`, updateRequest);
        return response.data;
    },

    updatePassword: async (userId, updatePasswordRequest) => {
        const response = await api.patch(`/user/new-password`, updatePasswordRequest);
        return response.data;
    },

    withdrawn: async (password) => {
        const response = await api.post(`/user/withdrawn`, password);
        return response.data;
    },

    withdrawalStatus: async () => {
        const response = await api.get(`/user/withdrawal-status`);
        return response.data;
    }
}