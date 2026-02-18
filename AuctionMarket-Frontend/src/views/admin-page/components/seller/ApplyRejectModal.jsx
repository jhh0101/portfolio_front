import { useState } from 'react';
import {useSellerReject} from "@/hooks/admin";

const ApplyRejectModal = ({ isOpen, onClose, apply }) => {
    const {mutateAsync: reject, isPending} = useSellerReject();
    const [isChecked, setIsChecked] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const isReadyToDelete = isChecked && rejectReason.length > 0;

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rejectReason = new FormData(e.currentTarget).get("rejectReason");
        if(!window.confirm("정말 거절 하시겠습니까?")) return;
        await reject({sellerId: apply?.data?.sellerId, request: rejectReason});
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{width: "400px"}} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>신청 거절</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        Nick Name : <h5 style={{display: "inline"}}>{apply?.data?.nickname}님</h5>
                        {/*<p>Point : {userStatus.data?.currentPoint.toLocaleString()} P </p>*/}
                        {/*<p>⚠️ 정지 시 아래 내역은 자동 취소됩니다. </p>*/}
                        {/*<p className={"mb-0"}> - 진행 중인 입찰 : {bidCount} 건</p>*/}
                        {/*<p className={"mb-0"}> - 진행 중인 경매 : {productCount} 건</p>*/}
                        <br/>
                        <br/>
                        <textarea
                            name={"rejectReason"}
                            style={{width: "100%", margin: "0", height: "150px"}}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder={"거절 사유 작성"}
                        />
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value=""
                                   id="flexCheckDefault"
                                   checked={isChecked}
                                   onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault" style={{fontSize: "13px"}}>
                                정말로 거절하시겠습니까?
                            </label>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="confirm-btn" style={{margin: "5px 20px 20px", width: "100%"}} disabled={isPending || !isReadyToDelete}>
                            {isPending ? "정지 중..." : "정지하기"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyRejectModal;