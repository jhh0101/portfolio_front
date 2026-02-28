import { useQuery } from '@tanstack/react-query';
import {adminService} from '@/api/adminService.js';


export const useSuspensionStatus = (userId) => {

    return useQuery({
        queryKey: ['user', 'status', String(userId)],
        queryFn: () =>
            adminService.suspensionStatus({userId}),
        enabled: !!userId,
    });
};