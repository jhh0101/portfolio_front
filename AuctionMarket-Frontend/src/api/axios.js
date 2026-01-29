import axios from "axios";

let cachedAccessToken = null;

export const setApiAccessToken = (token) => {
    cachedAccessToken = token;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        if (cachedAccessToken) {
            // 헤더에 토큰 추가
            config.headers.Authorization = `Bearer ${cachedAccessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;