import { useQuery } from '@tanstack/react-query';
import { userService } from "@/api/userService.js";


export const useGetProfile = (userId) => {

    return useQuery({
        queryKey: ['user', 'profile', String(userId)],
        queryFn: () =>
            userService.getProfile(),
        enabled: !!userId,
    });
};