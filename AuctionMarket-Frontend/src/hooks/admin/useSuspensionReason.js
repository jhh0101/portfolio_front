import { useQuery } from '@tanstack/react-query';
import {adminService} from '@/api/adminService.js';

export const useSuspensionReason = (userId) => {

    return useQuery({
        queryKey: ['user', 'reason', String(userId)],
        queryFn: () =>
            adminService.suspensionReason({userId}),
        enabled: !!userId,
    });
};