import { Link } from 'react-router-dom';
import { useBid } from "@/hooks/bid/useBid.js";
import BidderList from "@/components/bid/bidder-list/BidderList.jsx";

const BidDetailArea = ({ auctionId, productId }) => {
    const { bidderList, isBidderLoading } = useBid(auctionId);

    if (isBidderLoading) return <div>로딩 중...</div>;

    return (
        <div className="auction-details">
            <div className={"auction-details-header"}>
                <div style={{ fontWeight: 'bold' }}>📢 입찰 내역</div>
                <Link to={`/product/${productId}`} className={"btn-black"}> 상품 페이지로 이동 </Link>
            </div>
            <div style={{maxHeight: "260px"}}>
                <BidderList
                    bidder={bidderList}
                    isBidderLoading={isBidderLoading}
                    productInfo={productId}
                />

            </div>
        </div>
    );
};

export default BidDetailArea;