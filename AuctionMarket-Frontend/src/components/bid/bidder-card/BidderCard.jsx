import { useBid } from '@/hooks/bid/useBid.js';
import { useAuth } from "@/context/AuthContext.jsx";

export default function BidderCard({ auctionId, productId, bidId, rank, nickname, price}) {
    const {bidCancel: cancel, isCancelLoading} = useBid(auctionId, productId, 0, { fetchList: false });
    const { user } = useAuth();

    const myNickname = user.nickname;
    const cancelBtn = myNickname === nickname && rank === 1;

    const handleCancel = async (e) => {
        if (window.confirm("정말 취소하시겠습니까?")){
            e.preventDefault();
            await cancel({bidId});
        } else {
            return;
        }

    }

    return (
            <div className="bidder-card">
                <div className="card-col rank">{rank}</div>
                <div className="card-col nickname">{nickname}</div>
                <div className="card-col price">{price.toLocaleString()}원</div>
                {cancelBtn ? (
                    <button className="card-col close-btn" onClick={handleCancel} disabled={isCancelLoading}>
                        &times;
                    </button>
                ) : (
                    <div className="card-col close-btn"></div>
                )}

            </div>
    );
}