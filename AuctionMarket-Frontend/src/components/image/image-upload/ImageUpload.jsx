import React, { useEffect, useState } from 'react';

const ImageUpload = ({
                         imageFiles,
                         setImageFiles,
                         existingImages = [],
                         onRemoveExisting = () => {},
                     }) => {
    const [previews, setPreviews] = useState([]);

    // 새 이미지 파일에 대한 프리뷰 URL 생성 및 메모리 해제
    useEffect(() => {
        const objectUrls = imageFiles.map(file => URL.createObjectURL(file));
        setPreviews(objectUrls);

        return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
    }, [imageFiles]);

    const totalCount = existingImages.length + imageFiles.length;

    const handleAddImages = (e) => {
        const files = Array.from(e.target.files);
        if (totalCount + files.length > 5) {
            alert("이미지는 최대 5장까지 등록 가능합니다.");
            return;
        }
        setImageFiles(prev => [...prev, ...files]);
    };

    const handleRemoveNew = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="multi-upload-container">
            <label className="section-label">Product Images ({totalCount}/5)</label>
            <div className="image-grid">
                {/* 기존 이미지 목록 */}
                {existingImages.map((img, index) => (
                    <div key={`existing-${img.imageId || index}`} className="image-item">
                        <img src={img.imageUrl} alt="existing" />
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => onRemoveExisting(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {/* 새로 추가된 이미지 프리뷰 */}
                {previews.map((src, index) => (
                    <div key={`new-${index}`} className="image-item new-item">
                        <img src={src} alt="new preview" />
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => handleRemoveNew(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {/* 추가 버튼 */}
                {totalCount < 5 && (
                    <label className="add-image-box">
                        <span className="plus-icon">+</span>
                        <p>Add Photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={handleAddImages}
                        />
                    </label>
                )}
            </div>
            <p className="upload-hint">You can upload up to 5 photos.</p>
        </div>
    );
};

export default ImageUpload;