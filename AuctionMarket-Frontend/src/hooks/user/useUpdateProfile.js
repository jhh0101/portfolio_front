import { useMutation, useQueryClient} from '@tanstack/react-query';
import { userService } from "@/api/userService.js";
import toast from 'react-hot-toast';

export const useUpdateProfile = (userId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({nickname, phone}) =>
            userService.updateProfile({nickname, phone}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'profile', String(userId)] });
            toast.success("회원 정보 수정 성공!");
        },
    });
};