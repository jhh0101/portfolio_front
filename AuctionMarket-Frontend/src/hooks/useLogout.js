import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { authService } from '@/api/authService.js'
import toast from 'react-hot-toast';
import {useAuth} from "@/context/AuthContext.jsx";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { logout: authLogout } = useAuth();

    return useMutation({
        mutationFn: ({userId}) =>
            authService.postLogout({userId}),
        onSuccess: (res) => {

            if (!res.success) {
                throw new Error(res.message || "요청 실패");
            }

            authLogout();
            queryClient.clear();
            toast.success("로그아웃 성공!");
            navigate('/login');
        }
    });
};