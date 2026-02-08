import { useMutation, useQueryClient} from '@tanstack/react-query';
import {userService} from '@/api/userService.js';
import toast from 'react-hot-toast';

export const useWithdrawn = (userId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (password) => {
            return userService.withdrawn(password);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user', 'profile', String(userId)]});
            toast.success("회원 탈퇴 성공!");
        },
    });
};