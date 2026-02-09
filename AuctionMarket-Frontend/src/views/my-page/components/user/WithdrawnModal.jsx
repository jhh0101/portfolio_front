import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useWithdrawn, useWithdrawalStatus} from "@/hooks/user";

const WithdrawnModal = ({ isOpen, onClose, userId, logout }) => {
    const {data: myStatus, isLoading} = useWithdrawalStatus(userId)
    const {mutateAsync: withdrawn, isPending} = useWithdrawn(userId);
    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState("");

    const bidCount = myStatus?.data?.bidCount || 0;
    const productCount = myStatus?.data?.productCount || 0;
    const isReadyToDelete = bidCount + productCount === 0 && isChecked && password.length > 0;

    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = new FormData(e.currentTarget).get("password");
        if(!window.confirm("정말 회원을 탈퇴하시겠습니까?")) return;
        await withdrawn({password});
        onClose();
        logout();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{width: "400px"}} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>회원 탈퇴</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        Nick Name : <h5 style={{display: "inline"}}>{myStatus.data?.nickname}님</h5>
                        <p>Point : {myStatus.data?.currentPoint} P <span style={{color: "red", fontSize: "12px"}}>(탈퇴 시 소멸됨)</span></p>
                        <p>⚠️ 확인 필요 <span style={{fontSize: "12px"}}>(진행 중인 건이 있을 시 탈퇴 불가)</span></p>
                        <p className={"mb-0"}> - 진행 중인 입찰 : {bidCount} 건</p>
                        <p className={"mb-0"}> - 진행 중인 경매 : {productCount} 건</p>
                        <br/>
                        <input
                            type={"password"}
                            name={"password"}
                            style={{width: "100%", margin: "0"}}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"비밀번호 확인"}
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
                                위 내용을 모두 확인했으며, 탈퇴 시 데이터 복구가 불가능함에 동의합니다.
                            </label>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="confirm-btn" style={{margin: "5px 20px 20px", width: "100%"}} disabled={isPending || !isReadyToDelete}>
                            {isPending ? "탈퇴 중..." : "탈퇴하기"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawnModal;