import {useState} from "react";
import {signupService} from "../api/signupService.js";

export const useSignup = ({email = "", username = "", nickname = "", phone = "", password = ""} = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (email, username, nickname, phone, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await signupService.postSignup({email, username, nickname, phone, password});

            setData(response.data);
            return response.data;
        } catch (e) {
            console.error("회원가입 에러 상세:", e);

            const errorData = e.response?.data;
            const errMsg = errorData?.message || "회원가입 중 에러가 발생했습니다.";

            setError(errMsg);

            return errorData || {success: false, message: errMsg};
        } finally {
            setLoading(false);
        }
    };
    return {
        signup,
        data,
        loading,
        error
    };
};