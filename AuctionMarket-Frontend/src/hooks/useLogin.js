import {useState} from "react";
import {loginService} from "../api/loginService.js";

export const useLogin = ({email = "", password = ""} = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginService.postLogin({email, password});

            setData(response.data);
            return response.data;
        } catch (e) {
            console.error("로그인 에러 상세:", e);

            const errorData = e.response?.data;
            const errMsg = errorData?.message || "로그인 중 에러가 발생했습니다.";

            setError(errMsg);

            return errorData || { success: false, message: errMsg };
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        data,
        loading,
        error,
    };
};