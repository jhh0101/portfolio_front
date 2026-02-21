import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {paymentService} from '@/api/paymentService.js';
import toast from 'react-hot-toast';

export const useConfirmPayment = (userId) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: paymentService.confirmToss,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user', 'profile', String(userId)]});
            toast.success(`포인트 결제 성공!`);
            navigate('/mypage');
        },
    })
};