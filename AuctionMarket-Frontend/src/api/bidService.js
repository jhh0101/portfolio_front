import api from "./axios.js";

export const bidService = {
    bidding: async ({auctionId, bidPrice}) => {
        const response = await api.post(`/auction/${auctionId}`, {bidPrice});
        return response.data;
    },

    getBidder: async ({auctionId, page = 0, size = 10 }) => {
        const response = await api.get(`/auction/${auctionId}/bid`, {
            params: {
                page: page,
                size: size,
            }
        });
        return response.data.data;
    },

    bidCancel: async ({auctionId, bidId}) => {
        const response = await api.post(`/auction/${auctionId}/bid/${bidId}`);
        return response.data;
    },

    myBids: async ({page = 0, size = 5}) => {
        const response = await api.get(`/auction/my/bid`, {
            params: {
                page: page,
                size: size,
            }
        });
        return response.data;
    },

    userBids: async ({userId, page}) => {
        const response = await api.get(`admin/${userId}/bid`, {
            params: {
                page: page,
                size: 10,
            }
        });
        return response.data;
    },

    userBidList: async ({userId, auctionId, page}) => {
        const response = await api.get(`admin/${auctionId}/bid-list/${userId}`, {
            params: {
                page: page,
                size: 10,
            }
        });
        return response.data;
    }

};