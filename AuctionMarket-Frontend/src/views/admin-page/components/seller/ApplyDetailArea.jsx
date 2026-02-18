import React, { useState } from 'react';
import {useUserApply, useSellerApprove} from "@/hooks/admin";
import ApplyRejectModal from './ApplyRejectModal.jsx';

const ApplyDetailArea = ({ apply }) => {
    const {data: userApply, isLoading} = useUserApply(apply?.sellerId);
    const {mutate: approve, isPending} = useSellerApprove();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const handleApprove = () => {
        approve(apply?.sellerId);
    }

    return (
        <div className="member-details" style={{height: "100%"}}>
            <div className="detail-grid" style={{height: "80%"}}>
                <div className="detail-item">
                    <span className="detail-label">Store Name</span>
                    <span className="detail-value">{userApply?.data?.storeName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Bank Name</span>
                    <span className="detail-value">{userApply?.data?.bankName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Account Number</span>
                    <span className="detail-value">{userApply?.data?.accountNumber}원</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Account Holder</span>
                    <span className="detail-value">{userApply?.data?.accountHolder}</span>
                </div>
            </div>

            <div className="detail-actions">
                <button
                    className="btn btn-outline-success"
                    style={{marginRight: "10px", fontSize: "13px", fontWeight: "600", width: "60px"}}
                    onClick={handleApprove}
                    disabled={isPending}
                >
                    {isPending ? "수락 중 ..." : "수락"}
                </button>
                <button
                    className="btn-suspend"
                    onClick={() => setIsApplyModalOpen(true)}
                >
                    거절
                </button>
                <ApplyRejectModal
                    isOpen={isApplyModalOpen}
                    onClose={() => setIsApplyModalOpen(false)}
                    apply={userApply}
                />
            </div>
        </div>
    );
};

export default ApplyDetailArea;