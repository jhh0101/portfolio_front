import { useQuery } from '@tanstack/react-query';
import { orderService } from "@/api/orderService.js"

export const useMyOrderList = (userId, page = 0) => {
    return useQuery({
        queryKey: ['orders', 'my', String(userId), page],
        queryFn: () => orderService.myOrders({page, size: 5}),
        enabled: !!userId,
        keepPreviousData: true,
    });
};
