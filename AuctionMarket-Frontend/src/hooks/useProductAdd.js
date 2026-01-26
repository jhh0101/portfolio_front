import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductImage } from '@/hooks/useProductImage';
import { getFormattedDate, formatTime } from '@/utils/dataFormmatter.js';

import toast from 'react-hot-toast';
export const useProductAdd = () => {
    const navigate = useNavigate();
    const { addProduct, isAdding } = useProductDetail();
    const { uploadAsync } = useProductImage();

    // 1. 상태 관리
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: 1, title: '', description: '',
        startPrice: '', startTime: '', endTime: '',
    });

    // 2. 시간 계산 로직
    const minStartTime = getFormattedDate(new Date());
    const minEndTime = formData.startTime || getFormattedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

    // 3. 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            productRequest: {
                categoryId: Number(formData.categoryId),
                title: formData.title,
                description: formData.description,
            },
            auctionRequest: {
                startPrice: Number(formData.startPrice),
                startTime: formatTime(formData.startTime),
                endTime: formatTime(formData.endTime),
            },
        };

        try {
            const result = await addProduct(payload);

            const newId = result.productId || result.data?.productId;

            if (newId && imageFiles.length > 0) {
                const imageFormData = new FormData();
                imageFiles.forEach(file => imageFormData.append("files", file));
                await uploadAsync({ productId: newId, formData: imageFormData });
            }
            toast.success("상품이 등록되었습니다!");
            navigate(`/product/${newId}`);
        } catch (err) {
            console.error("등록 실패 : ", err);
        }
    };

    return {
        formData, setFormData,
        imageStates: { imagePreviews, setImagePreviews, imageFiles, setImageFiles },
        timeLimits: { minStartTime, minEndTime },
        handlers: { handleChange, handleSubmit },
        status: { isAdding }
    };
};