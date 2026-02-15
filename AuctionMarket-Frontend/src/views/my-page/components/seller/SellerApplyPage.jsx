import {useSellerApply, useApplyDetails, useApplyCancel, useApplyModify} from '@/hooks/seller';

const SellerApplyPage = ({decoded, profile, isLoading}) => {

    const shouldFetch = profile?.data?.sellerStatus !== 'NONE';
    const {mutate: sellerApply, isPending: isApplying} = useSellerApply(decoded.sub);
    const {mutateAsync: applyCancel, isPending: isCanceling} = useApplyCancel(decoded.sub);
    const {data: applyDetails} = useApplyDetails(decoded.sub, {
        enabled: shouldFetch
    });
    const {mutateAsync: applyModify, isPending: isEditing} = useApplyModify(decoded.sub, applyDetails?.data?.sellerId);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>

    console.log(applyDetails);

    const handleUpdateApply = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        if(payload.accountNumber){
            payload.accountNumber = payload.accountNumber.replace(/-/g, "");
        }
        await applyModify(payload);
        window.location.reload();
    };

    const handleCancelApply = async () => {
        await applyCancel(applyDetails?.data?.sellerId);
        window.location.reload();
    };

    const handleSellerApply = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        if(payload.accountNumber){
            payload.accountNumber = payload.accountNumber.replace(/-/g, "");
        }
        sellerApply(payload);
        window.location.reload();
    };

    return (
        <div className="mypage-container">
            <h3 className="section-title">Apply Details</h3>
            <form onSubmit={applyDetails && profile?.data?.sellerStatus !== 'CANCELED' ? (handleUpdateApply) : (handleSellerApply)}>
                <div className="form-group">
                    <label className="form-label">Store Name</label>
                    <input
                        type="text"
                        name="storeName"
                        className="form-input"
                        placeholder={"상호명을 입력해주세요."}
                        defaultValue={applyDetails?.data?.storeName}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Bank Name</label>
                    <input
                        type="text"
                        name="bankName"
                        className="form-input"
                        placeholder={"은행명을 입력해주세요."}
                        defaultValue={applyDetails?.data?.bankName}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Account Number<p>(Number Only)</p></label>
                    <input
                        type="text"
                        name="accountNumber"
                        className="form-input"
                        placeholder={"계좌번호를 입력해주세요.(숫자만 입력, 10 ~ 16자)"}
                        defaultValue={applyDetails?.data?.accountNumber}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Account Holder</label>
                    <input
                        type="text"
                        name="accountHolder"
                        className="form-input"
                        placeholder={"예금주명을 입력해주세요."}
                        defaultValue={applyDetails?.data?.accountHolder}
                    />
                </div>
                <div className="form-actions">
                    {applyDetails && profile?.data?.sellerStatus !== 'CANCELED' ? (
                        <>
                            <button type="submit" className="btn btn-dark"
                                    style={{marginRight: "10px", width: "80px"}}
                                    disabled={isEditing}>
                                {isEditing ? "Editing... " : "Edit"}
                            </button>
                            <button type="button" className="btn btn-outline-danger"
                                    onClick={handleCancelApply} disabled={isCanceling}>
                                {isCanceling ? "Canceling... " : "Cancel"}
                            </button>
                        </>
                    ) : (
                        <button type="submit" className="btn-black" disabled={isApplying}>
                            {isApplying ? "Applying... " : "Apply"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SellerApplyPage;