import { useState } from 'react';
import {useRejectReason} from "@/hooks/seller";

const RejectReasonModal = ({ isOpen, onClose, user }) => {
    const {data: reason, isLoading} = useRejectReason(user.userId, isOpen);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{width: "400px"}}>
                <div className="modal-header">
                    <h3>신청 거절 사유</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    Nick Name : <h5 style={{display: "inline"}}>{user?.nickname}님</h5>
                    <br/>
                    <br/>
                    <div style={{width: "100%", margin: "0",
                        height: "180px", border: "1px solid #ccc",
                        borderRadius: "5px", padding: "10px",
                        overflowY: "auto",
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap"}}>
                        {reason?.data?.rejectReason}
                    </div>

                </div>
                <div className="modal-footer">
                    <button className="confirm-btn" style={{margin: "5px 20px 20px", width: "100%"}} onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectReasonModal;