import { useQuery } from '@tanstack/react-query';
import {adminService} from '@/api/adminService.js';


export const useUserList = (searchParams = {}) => {

    return useQuery({
        queryKey: ['user', 'list', searchParams],
        queryFn: () => adminService.userList(searchParams)
    });
};