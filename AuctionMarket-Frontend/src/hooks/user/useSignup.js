import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { userService } from "@/api/userService.js";
import toast from 'react-hot-toast';

export const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({email, username, nickname, baseAddress, detailAddress, phone, password}) =>
            userService.postSignup({email, username, nickname, baseAddress, detailAddress, phone, password}),
        onSuccess: (res) => {
            if (!res.success) {
                throw new Error(res.message || "요청 실패");
            }
            toast.success("회원가입 성공!");
            navigate('/login');
        },
    });
};