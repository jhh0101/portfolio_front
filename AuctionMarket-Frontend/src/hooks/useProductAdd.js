import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDetail } from './useProductDetail';
import { useProductImage } from './useProductImage';

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
    const getFormattedDate = (date) => {
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date - tzOffset).toISOString().slice(0, 16);
    };
    const minStartTime = getFormattedDate(new Date());
    const minEndTime = formData.startTime || getFormattedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

    // 3. 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formatTime = (time) => (time ? `${time}:00` : "");
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

            navigate(`/product/${newId}`);
        } catch (err) {
            alert("등록 중 오류가 발생했습니다.");
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