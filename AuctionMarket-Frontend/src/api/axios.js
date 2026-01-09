import axios from "axios";

const api = axios.create({
    baseURL: '/api',
});

// 요청 인터셉터 추가
api.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져옵니다.
        // 로그인 시 저장한 키 이름(예: 'accessToken' 또는 'token')과 똑같아야 합니다.
        const token = localStorage.getItem("token");

        if (token) {
            // 헤더에 토큰 추가
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;