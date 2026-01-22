import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from './useProduct';
import { useProductImage } from './useProductImage';

export const useProductAdd = () => {
    const navigate = useNavigate();
    const { product, loading } = useProduct();
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

        const result = await product(payload);
        if (result?.success) {
            const newId = result.data?.productId;
            if (newId && imageFiles.length > 0) {
                const imageFormData = new FormData();
                imageFiles.forEach(file => imageFormData.append("files", file));
                try {
                    await uploadAsync({ productId: newId, formData: imageFormData });
                } catch (err) { console.error(err); }
            }
            alert("상품 등록이 완료되었습니다.");
            navigate(`/product/${newId}`);
        }
    };

    // View에서 필요한 것들만 골라서 내보냅니다.
    return {
        formData, setFormData,
        imageStates: { imagePreviews, setImagePreviews, imageFiles, setImageFiles },
        timeLimits: { minStartTime, minEndTime },
        handlers: { handleChange, handleSubmit },
        status: { loading }
    };
};