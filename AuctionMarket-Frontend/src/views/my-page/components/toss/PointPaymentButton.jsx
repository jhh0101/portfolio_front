import React,{useState} from 'react';
import PaymentAmountModal from "./PaymentAmountModal.jsx";

const PointPaymentButton = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="point-btn-wrapper">
                <button className="amount-btn" onClick={() => setIsModalOpen(true)}>포인트 결제</button>
            </div>
            <PaymentAmountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user}/>
        </>
    );
};

export default PointPaymentButton;