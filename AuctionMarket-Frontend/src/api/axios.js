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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (response) {
            const status = response.status;
            const errorCode = response.data?.code; // 백엔드에서 보낸 커스텀 코드

            if (errorCode === 'SUSPENDED_USER') {
                alert('계정이 정지되었습니다. 고객센터에 문의하세요.');
                handleLogout();
                return Promise.reject(error);
            }

            if (status === 403) {
                alert('접근 권한이 없습니다.');
            }
        }
        return Promise.reject(error);
    }
);

function handleLogout() {
    cachedAccessToken = null;
    window.location.href = '/login';
}

export default api;