import BidderCard from "@/components/bid/bidder-card/BidderCard.jsx";
import './BidderList.css'

const BidderList = ({bidder, productInfo, isBidderLoading}) => {
    if (isBidderLoading) return <div className="loading"  style={{height: "100vh"}}>로딩 중...</div>;

    return (
        <div className="bidder-container">
            <div className="bidder-header">
                <span className="header-col rank">순위</span>
                <span className="header-col nickname">닉네임</span>
                <span className="header-col price">입찰 가격</span>
            </div>

            <div className="bidder-scroll-area">
                {bidder?.content?.length > 0 ? (
                    bidder.content.map((bid, index) => (
                        <BidderCard
                            key={bid.bidId}
                            rank={index + 1}
                            nickname={bid.nickname}
                            price={bid.bidPrice}
                            auctionId={bid.auctionId}
                            bidId={bid.bidId}
                            productId={productInfo.productId}
                        />
                    ))
                ) : (
                    <div className="empty-message">첫 입찰자가 되어보세요!</div>
                )}
            </div>
        </div>
    );
};
export default BidderList;