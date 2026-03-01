const ProductCount = ({info, bidder}) => {
    // console.log(bidder.totalElements);
    return (
        <>
            <div className="auction-stats-container d-flex gap-2 mb-3">
                <div className="auction-badge view-badge">
                    🔥 조회수 {info?.viewCount}
                </div>
                <div className="auction-badge bid-badge">
                    🔨 입찰현황 {bidder?.totalElements}건
                </div>
            </div>
        </>
    );
};

export default ProductCount;