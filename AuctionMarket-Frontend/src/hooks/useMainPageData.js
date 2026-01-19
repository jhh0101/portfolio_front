import useProductList from '../hooks/useProductList.js'

export const useMainPageData = () => {
    // 1. 훅을 호출하면서 필요한 것만 바로 꺼냅니다.
    // React Query의 결과물에서 data(이름변경), isLoading을 바로 추출
    const {
        data: newAuctionData,
        isLoading: isNewLoading,
        isError: isNewError
    } = useProductList({size: 10});

    const {
        data: closingAuctionData,
        isLoading: isClosingLoading,
        isError: isClosingError
    } = useProductList({sort: "endingSoon", size: 10});

    return {
        newAuction: newAuctionData,
        closingAuction: closingAuctionData,
        // 변수명을 명확히 구분했기 때문에 노란 줄이 생기지 않습니다.
        isLoading: isNewLoading || isClosingLoading,
        isError: isNewError || isClosingError
    };
};