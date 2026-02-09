import React from 'react';
import { useBid } from "@/hooks/bid";
import './BidModal.css'

const BidModal = ({ isOpen, onClose, auction, product }) => {
    const { productBid, isBidding } = useBid(auction.auctionId, product.productId, 0, { fetchList: false });
    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const bidPrice = Number(formData.get("bidPrice"));

        await productBid({bidPrice});
        onClose();

    };


    return (

        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{width: "400px"}} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>입찰 가격 입력</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        현재 입찰가 : <h5 style={{display: "inline"}}>{auction.currentPrice.toLocaleString()}원</h5>
                        <p> 입찰 가격(원)</p>
                        <input type={"number"} name={"bidPrice"} style={{width: "100%"}} placeholder={auction.currentPrice.toLocaleString()} />
                    </div>
                    <div className="modal-footer">
                        <button className="confirm-btn" style={{margin: "5px 20px 20px", width: "100%"}} disabled={isBidding}>
                            {isBidding ? "입찰 중..." : "입찰"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BidModal;