import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductModify } from '@/hooks/product/useProductModify.js';
import { useProductImage } from '@/hooks/product/useProductImage.js';
import { useProductImageDelete } from '@/hooks/product/useProductImageDelete.js';
import { getFormattedDate, formatTime } from '@/utils/dataFormatter.js';
import toast from 'react-hot-toast';

export const useProductEdit = (productId, initialData) => {
    const navigate = useNavigate();
    const { mutateAsync: modifyProduct, isPending } = useProductModify(productId);
    const { uploadAsync } = useProductImage();
    const { mutateAsync: deleteImages } = useProductImageDelete(productId);

    const [existingImages, setExistingImages] = useState([]);
    const [deleteImageIds, setDeleteImageIds] = useState([]);
    const [newFiles, setNewFiles] = useState([]);

    const [formData, setFormData] = useState({
        categoryId: '',
        title: '',
        description: '',
        startPrice: '',
        startTime: '',
        endTime: '',
    });

    // initialData가 변경될 때(데이터 로딩 완료 시) 실행
    useEffect(() => {
        if (initialData) {
            console.log('🔍 Initial Data:', initialData); // 디버깅용
            // productDetailResponse와 auctionResponse로 분리된 구조 처리
            const productDetail = initialData.productDetailResponse || initialData;
            const auctionDetail = initialData.auctionResponse || initialData;
            
            setFormData({
                categoryId: productDetail.categoryId || '',
                title: productDetail.title || '',
                description: productDetail.description || '',
                startPrice: auctionDetail.startPrice || '',
                // input[type="datetime-local"] 포맷 대응
                startTime: auctionDetail.startTime ? auctionDetail.startTime.substring(0, 16) : '',
                endTime: auctionDetail.endTime ? auctionDetail.endTime.substring(0, 16) : '',
            });

            // 중요: 이미지가 존재하면 상태 업데이트
            const imageData = initialData.images || [];
            console.log('🖼️ Image Data:', imageData); // 디버깅용
            
            if (imageData && imageData.length > 0) {
                setExistingImages(imageData);
            }
        }
    }, [initialData]);


    const minStartTime = getFormattedDate(new Date());
    const minEndTime = formData.startTime || getFormattedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (categoryObj) => {
        setFormData(prev => ({ ...prev, categoryId: categoryObj?.categoryId || '' }));
    };

    const handleRemoveExisting = (index) => {
        const targetImage = existingImages[index];
        if (targetImage?.imageId) {
            setDeleteImageIds(prev => [...prev, targetImage.imageId]);
        }
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (deleteImageIds.length > 0) {
                for (const id of deleteImageIds) {
                    await deleteImages(id);
                }
            }

            setDeleteImageIds([]);

            const payload = {
                productId: Number(productId),
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

            await modifyProduct(payload);

            if (newFiles.length > 0) {
                const imgData = new FormData();
                newFiles.forEach(file => imgData.append("files", file));
                await uploadAsync({ productId, formData: imgData });
            }

            toast.success("수정 완료!");
            navigate(`/product/${productId}`);
        } catch (err) {
            toast.error("수정 실패");
        }
    };

    return {
        formData,
        imageStates: { existingImages, newFiles, setNewFiles },
        timeLimits: { minStartTime, minEndTime },
        handlers: { handleChange, handleSubmit, handleCategorySelect, handleRemoveExisting },
        status: { isPending }
    };
};