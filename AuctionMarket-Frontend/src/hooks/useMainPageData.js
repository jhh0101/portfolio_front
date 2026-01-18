import useProducts from "./useProducts.js";

export const useMainPageData = () => {
    const newAuction = useProducts({initialSize: 10});
    const closingAuction = useProducts({initialSort: "endingSoon", initialSize: "10"});

    return {
        newAuction,
        closingAuction,
        isLoading: newAuction.loading || closingAuction.loading,
        isError: newAuction.error || closingAuction.error
    };
}