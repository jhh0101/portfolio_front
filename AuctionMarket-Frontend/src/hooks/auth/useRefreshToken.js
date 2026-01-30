import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/authService.js";
import toast from 'react-hot-toast';
import { useAuth } from "@/context/AuthContext.jsx";

export const useRefreshToken = () => {
    const { login: authLogin } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            authService.refreshToken(),
        onSuccess: (res) => {

            if (!res.success) {
                throw new Error(res.message || "요청 실패");
            }

            authLogin(res.data);
            queryClient.clear();
            toast.success("토큰 재발급");
        }
    })
};
