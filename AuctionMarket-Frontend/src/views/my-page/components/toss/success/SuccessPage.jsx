import {useEffect, useRef} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {useConfirmPayment} from '@/hooks/toss';

const SuccessPage = (user) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { mutate: confirmPayment, isPending, isError, error } = useConfirmPayment(user?.user?.sub);

    const isProcessed = useRef(false);

    useEffect(() => {
        if (isProcessed.current) return;
        isProcessed.current = true;

        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (paymentKey && orderId && amount) {
            confirmPayment(
                { paymentKey, orderId, amount },
                {
                    onError: (err) => {
                        alert('결제 승인 실패: ' + err.message);
                        navigate('/mypage');
                    }
                }
            );
        }
    }, [searchParams, navigate, confirmPayment]);

    if (isError) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>에러 발생: {error?.message}</div>;
    }

    if (isPending) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>결제 승인 중입니다... ⏳</h2>
                <p>창을 닫거나 새로고침하지 마세요.</p>
            </div>
        );
    }

    return null;
};

export default SuccessPage;