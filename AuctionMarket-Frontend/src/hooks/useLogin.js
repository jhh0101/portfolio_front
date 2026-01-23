import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { loginService } from '../api/loginService.js'
import toast from 'react-hot-toast';
import {useAuth} from "../context/AuthContext.jsx";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    return useMutation({
        mutationFn: ({email, password}) =>
            loginService.postLogin({email, password}),
        onSuccess: (res) => {
            if (res && res.success) {
                const token = res.data;

                if (token && typeof token === 'string') {
                    authLogin(token);
                    queryClient.clear();
                    navigate('/');
                    toast.success("로그인 성공!");
                } else {
                    toast.error("토큰 형식이 올바르지 않습니다.");
                }
            } else {
                toast.error(res?.message || "로그인 정보를 확인해주세요.");
            }
        }
    });
};