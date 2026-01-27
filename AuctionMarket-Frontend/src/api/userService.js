import api from "./axios.js";

export const userService =  {
    postSignup: async (data) => {
        const response = await api.post("/user/signup", data);
        return response.data;
    }
}