import useProducts from "./useProducts.js";

export const useMainPageData = () => {
    const newAuction = useProducts();
    const closingAuction = useProducts({initialSort: "endingSoon"});

    return {
        newAuction,
        closingAuction,
        isLoading: newAuction.loading || closingAuction.loading,
        isError: newAuction.error || closingAuction.error
    };
}