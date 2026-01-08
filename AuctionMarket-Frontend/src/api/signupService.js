import api from "./axios.js";

export const signupService =  {
    postSignup: async (data) => {
        return await api.post("/user/signup", data);
    }
}