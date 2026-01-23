import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import {signupService} from "../api/signupService.js";
import toast from 'react-hot-toast';

export const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({email, username, nickname, phone, password}) =>
            signupService.postSignup({email, username, nickname, phone, password}),
        onSuccess: (res) => {
            if (res && res.success) {
                toast.success("회원가입 성공!");
                navigate('/login');
            } else {
                toast.error("회원가입 실패: " + (res?.message || "서버 연결에 실패했습니다."));
            }
        },
    });
};