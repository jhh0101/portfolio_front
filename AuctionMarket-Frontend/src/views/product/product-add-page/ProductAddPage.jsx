import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct.js";
import { productService } from "../../../api/productService.js";
import './ProductAddPage.css';
import CategorySelector from "../../../components/category/CategorySelector.jsx";

const ProductAddPage = () => {
    const navigate = useNavigate();
    const { product, loading } = useProduct();

    // 1. 통합 상태 관리
    const [formData, setFormData] = useState({
        categoryId: 1,
        title: '',
        description: '',
        startPrice: '',
        startTime: '',
        endTime: '',
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    // 2. 시간 제한을 위한 최소 날짜 계산 (YYYY-MM-DDTHH:mm)
    const getFormattedDate = (date) => {
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date - tzOffset).toISOString().slice(0, 16);
    };
    const minStartTime = getFormattedDate(new Date());
    const minEndTime = formData.startTime || getFormattedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

    // 3. 핸들러 함수들
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. 핸들러 함수들 수정
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // 기존 파일들과 합치기 (중복 선택 가능하게)
        setImageFiles(prev => [...prev, ...files]);

        // 미리보기 URL 생성 및 기존 미리보기에 합치기
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

// 개별 이미지 삭제 기능 추가
    const handleRemoveImage = (index) => {
        // 메모리 누수 방지를 위해 URL 해제
        URL.revokeObjectURL(imagePreviews[index]);

        // 해당 인덱스만 제외하고 상태 업데이트
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // 4. 최종 등록 로직 (연쇄 호출)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // [중요] 전쇄 호출을 위한 데이터 조립 (payload가 정의되어 있어야 함)
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

        // 1. 상품 정보 등록
        const result = await product(payload);

        if (result?.success) {
            // 2. ID 추출 (서버 응답 구조: { success: true, data: { productId: 2, ... } })
            const newId = result.data?.productId;

            if (!newId) {
                console.error("ID 추출 실패! 서버 응답 구조를 확인하세요:", result);
                alert("상품 ID를 가져오지 못해 등록을 완료할 수 없습니다.");
                return;
            }

            console.log("새 상품 ID 확보:", newId);

            // 3. 이미지가 있는 경우에만 업로드 진행
            if (imageFiles && imageFiles.length > 0) {
                try {
                    console.log(`${newId}번 상품 이미지 업로드 시작...`);
                    const imgRes = await productService.uploadImages(newId, imageFiles);

                    // 이미지 업로드 성공 여부 확인 (서버 응답 구조에 따라 수정 필요)
                    if (imgRes.data?.success || imgRes.success) {
                        console.log("이미지 업로드 성공");
                    }
                } catch (err) {
                    console.error("이미지 업로드 중 에러:", err);
                    alert("상품은 등록되었지만 이미지 업로드에 실패했습니다.");
                }
            }

            // 4. [핵심] 이미지 업로드 여부와 상관없이 최종적으로 페이지 이동
            alert("상품 등록이 완료되었습니다.");
            navigate(`/product/${newId}`);
        } else {
            // 등록 실패 시 에러 메시지
            alert("상품 등록 실패: " + (result?.message || "알 수 없는 에러"));
        }
    };
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Add New Product</h2>
                <p>Create a new auction listing</p>
            </div>

            <form className="product-add-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* 왼쪽: 이미지 섹션 */}
                    <div className="image-upload-section">
                        <label className="section-label">Product Images ({imageFiles.length}/5)</label>

                        <div className="multi-upload-container">
                            <div className="image-grid">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="image-item">
                                        <img src={src} alt={`preview ${index}`} />
                                        <button
                                            type="button"
                                            className="remove-btn"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                                {imageFiles.length < 5 && (
                                    <label className="add-image-box">
                                        <span className="plus-icon">+</span>
                                        <p>Add Photo</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            multiple
                                            hidden
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                        <p className="upload-hint">You can upload up to 5 photos.</p>
                    </div>

                    {/* 오른쪽: 상세 정보 입력 섹션 */}
                    <div className="info-input-section">
                        {/* 상품명 */}
                        <div className="form-section">
                            <div className="input-group">
                                <label className="input-label">Product Name</label>
                                <input type="text" name="title" className="main-input" value={formData.title} onChange={handleChange} placeholder="Enter product name" required />
                            </div>
                        </div>

                        {/* 카테고리 (넓게 배치) */}
                        <div className="form-section">
                            <CategorySelector formData={formData} setFormData={setFormData} mode={"register"} />
                        </div>

                        <div className="details-row">
                            {/* 시작가 설정 */}
                            <div className="input-group price-container">
                                <label className="input-label">Start Price</label>
                                <div className="currency-wrapper">
                                    <span className="unit-symbol">₩</span>
                                    <input
                                        type="number"
                                        name="startPrice"
                                        value={formData.startPrice}
                                        onChange={handleChange}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* 시간 설정 그룹 */}
                            <div className="time-group">
                                <div className="input-group">
                                    <label className="input-label">Start Time</label>
                                    <input type="datetime-local" name="startTime" min={minStartTime} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">End Time</label>
                                    <input type="datetime-local" name="endTime" min={minEndTime} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        {/* 상세 설명 */}
                        <div className="form-section">
                            <div className="input-group">
                                <label className="input-label">Description</label>
                                <textarea name="description" rows="6" value={formData.description} onChange={handleChange} placeholder="Describe your product in detail..." required></textarea>
                            </div>
                        </div>

                        {/* 버튼 섹션 */}
                        <div className="form-actions-fixed">
                            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? "Processing..." : "Publish Product"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductAddPage;