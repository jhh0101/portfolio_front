import { useMutation, useQueryClient} from '@tanstack/react-query';
import { userService } from "@/api/userService.js";
import toast from 'react-hot-toast';

export const useUpdatePassword = (userId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({currentPassword, newPassword, confirmPassword}) =>
            userService.updatePassword({currentPassword, newPassword, confirmPassword}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'profile', String(userId)] });
            toast.success("회원 비밀번호 수정 성공!");
        },
    });
};