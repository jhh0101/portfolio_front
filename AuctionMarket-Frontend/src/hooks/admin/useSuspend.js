import { useMutation, useQueryClient} from '@tanstack/react-query';
import {adminService} from '@/api/adminService.js';
import toast from 'react-hot-toast';

export const useSuspend = (userId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (suspensionReason) => {
            return adminService.suspend({userId, suspensionReason});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user', 'profile', String(userId)]});
            queryClient.invalidateQueries({queryKey: ['user', 'list']});
            toast.success("회원 정지 성공!");
        },
    });
};