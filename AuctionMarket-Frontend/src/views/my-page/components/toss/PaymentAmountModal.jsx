import React from 'react';
import { useTossPayment } from '@/hooks/toss';
import './PaymentAmountModal.css';

const PaymentAmountModal = ({ isOpen, onClose, user }) => {
    const { requestPayment } = useTossPayment();

    const paymentTiers = [
        { label: '1만원', amount: 10000 },
        { label: '5만원', amount: 50000 },
        { label: '10만원', amount: 100000 },
        { label: '50만원', amount: 500000 },
    ];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>충전 금액 선택</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>충전하실 금액을 선택해주세요.</p>
                    <div className="payment-grid">
                        {paymentTiers.map((tier) => (
                            <button
                                key={tier.amount}
                                className="btn btn-outline-primary"
                                onClick={() => requestPayment(tier.amount, '포인트 충전', user?.name)}
                            >
                                {tier.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="confirm-btn" style={{margin: "5px 20px 20px", width: "100%"}} onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentAmountModal;