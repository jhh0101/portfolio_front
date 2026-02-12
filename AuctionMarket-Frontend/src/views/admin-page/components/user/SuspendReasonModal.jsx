import {useSuspensionReason} from "@/hooks/admin";

const SuspendReasonModal = ({ isOpen, onClose, user }) => {
    const {data: userReason, isLoading} = useSuspensionReason(user.userId)

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{width: "400px"}} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>⛔ 정지 처리 내역</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div style={{border: "1px solid #ffcccc", backgroundColor: "#fff5f5", padding: "16px", borderRadius: "8px"}}>

                        <span style={{backgroundColor: "#ff4d4f", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold"}}>
                            ⛔ 정지됨
                        </span>

                        <h4 style={{margin: "12px 0 8px 0", fontSize: "14px", color: "#333"}}>정지 사유</h4>
                        <p style={{color: "#555", backgroundColor: "white", padding: "10px", borderRadius: "4px", border: "1px solid #eee"}}>
                            {userReason?.data?.suspendReason}
                        </p>

                        <div style={{textAlign: "right", fontSize: "12px", color: "#999", marginTop: "8px"}}>
                            처리일: {new Date(user?.updatedAt).toLocaleString()}
                        </div>
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

export default SuspendReasonModal;