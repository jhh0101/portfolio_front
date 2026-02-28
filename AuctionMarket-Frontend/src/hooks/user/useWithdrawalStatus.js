import { useQuery } from '@tanstack/react-query';
import { userService } from "@/api/userService.js";


export const useWithdrawalStatus = (userId) => {

    return useQuery({
        queryKey: ['user', 'status', String(userId)],
        queryFn: () =>
            userService.withdrawalStatus(),
        enabled: !!userId,
    });
};