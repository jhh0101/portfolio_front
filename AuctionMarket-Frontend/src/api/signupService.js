import api from "./axios.js";

export const signupService =  {
    postSignup: async (data) => {
        const response = await api.post("/user/signup", data);
        return response.data;
    }
}