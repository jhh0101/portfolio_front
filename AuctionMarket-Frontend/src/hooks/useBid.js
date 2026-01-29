import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bidService } from "@/api/bidService.js"
import toast from 'react-hot-toast';

export const useBid = (auctionId, productId, page = 0) => {
    const queryClient = useQueryClient();

    const bidding = useMutation({
        mutationFn: ({bidPrice}) =>
            bidService.bidding({auctionId, bidPrice}),
        onSuccess: (res, variables) => {

            if (!res.success) {
                throw new Error(res.message || "요청 실패");
            }

            queryClient.invalidateQueries({
                queryKey: ['product', 'detail', String(productId)],
            });
            queryClient.invalidateQueries({
                queryKey: ['bidder', 'list', String(auctionId), page],
            });
            toast.success(`${variables.bidPrice.toLocaleString()}원 입찰 성공!`);
        },
    });

    const bidderList = useQuery({
        queryKey: ['bidder', 'list', String(auctionId), page],
        queryFn: () => bidService.getBidder({auctionId, page, size: 10}),
        enabled: !!auctionId,
    })

    const bidCancel = useMutation({
        mutationFn: ({bidId}) =>
            bidService.bidCancel({auctionId, bidId}),
        onSuccess: (res) => {

            if (!res.success) {
                throw new Error(res.message || "요청 실패");
            }

            queryClient.invalidateQueries({
                queryKey: ['product', 'detail', String(productId)],
            });
            queryClient.invalidateQueries({
                queryKey: ['bidder', 'list', String(auctionId), page],
            });
            toast.success(`입찰 취소 성공!`);
        },
    })

    return {
        // List
        bidderList: bidderList.data,
        isBidderLoading: bidderList.isLoading,
        isBidderError: bidderList.isError,
        // Cancel
        bidCancel: bidCancel.mutateAsync,
        isCancelLoading: bidCancel.isPending,

        // bidding
        productBid: bidding.mutateAsync,
        isBidding: bidding.isPending,
    };
};