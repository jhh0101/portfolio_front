const ImageUpload = ({imagePreviews, imageFiles, setImageFiles, setImagePreviews}) => {

    // 3. 핸들러 함수들 수정
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // 기존 파일들과 합치기 (중복 선택 가능하게)
        setImageFiles(prev => [...prev, ...files]);

        // 미리보기 URL 생성 및 기존 미리보기에 합치기
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        URL.revokeObjectURL(imagePreviews[index]);

        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="multi-upload-container">
                <label className="section-label">Product Images ({imageFiles.length}/5)</label>
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
        </>
    );
};

export default ImageUpload;