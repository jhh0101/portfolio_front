import { loadTossPayments } from '@tosspayments/payment-sdk';

export const useTossPayment = () => {
    const requestPayment = async (amount, orderName, customerName) => {
        try {
            const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
            const tossPayments = await loadTossPayments(clientKey);

            const baseUrl = window.location.origin;

            await tossPayments.requestPayment('토스페이', {
                amount,
                orderId: `order-${Math.random().toString(36).substring(2, 10)}`,
                orderName,
                customerName,
                successUrl: `${baseUrl}/payment/success`,
                failUrl: `${baseUrl}/mypage`,
            });
        } catch (error) {
            if (error.code === 'USER_CANCEL') {
                console.log('사용자가 결제를 취소했습니다.');
            } else {
                console.error('결제 에러:', error.message);
            }
        }
    };

    return { requestPayment };
};