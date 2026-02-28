import api from "./axios.js";

export const adminService =  {


    userList: async (searchParams) => {
        const response = await api.get(`/admin/list`, {params: searchParams});
        return response.data;
    },

    suspend: async ({userId, suspensionReason}) => {
        const response = await api.post(`admin/${userId}/suspend`, suspensionReason);
        return response.data;
    },

    suspensionStatus: async ({userId}) => {
        const response = await api.get(`admin/suspension-status/${userId}`);
        return response.data;
    },

    suspensionReason: async ({userId}) => {
        const response = await api.get(`admin/suspension-reason/${userId}`);
        return response.data;
    },

}