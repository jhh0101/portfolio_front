import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { loginService } from '@/api/loginService.js'
import toast from 'react-hot-toast';
import {useAuth} from "@/context/AuthContext.jsx";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    return useMutation({
        mutationFn: ({email, password}) =>
            loginService.postLogin({email, password}),
        onSuccess: (res) => {

            if (!res.success) {
                throw new Error(res.message || "요청 실패");
            }

            authLogin(res.data);
            queryClient.clear();
            toast.success("로그인 성공!");
            navigate('/');
        }
    });
};