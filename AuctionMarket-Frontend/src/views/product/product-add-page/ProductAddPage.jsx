import { useProductAdd } from '@/hooks/product';
import CategorySelector from "@/components/category/CategorySelector.jsx";
import ImageUpload from '@/components/image/image-upload/ImageUpload.jsx';
import StartPrice from "@/components/product/write/product-add-price/StartPrice.jsx";
import StartAndEndTime from "@/components/product/write/product-add-time/StartAndEndTime.jsx";
import './ProductAddPage.css';

const ProductAddPage = () => {
    const {
        formData, setFormData, imageStates,
        timeLimits, handlers, status,
    } = useProductAdd();

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Add New Product</h2>
                <p>Create a new auction listing</p>
            </div>

            <form className="product-add-form" onSubmit={handlers.handleSubmit}>
                <div className="form-grid">
                    {/* 왼쪽: 이미지 섹션 */}
                    <div className="image-upload-section">
                        <ImageUpload imageFiles={imageStates.imageFiles}
                                     setImageFiles={imageStates.setImageFiles} />
                    </div>

                    {/* 오른쪽: 상세 정보 입력 섹션 */}
                    <div className="info-input-section">
                        {/* 상품명 */}
                        <div className="form-section">
                            <div className="input-group">
                                <label className="input-label">Product Name</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="main-input"
                                    value={formData.title}
                                    onChange={handlers.handleChange}
                                    placeholder="Enter product name"
                                    required />
                            </div>
                        </div>

                        {/* 카테고리 (넓게 배치) */}
                        <div className="form-section">
                            <CategorySelector
                                onSelect={handlers.handleCategorySelect}
                                mode={"register"} />
                        </div>

                        <div className="details-row">
                            {/* 시작가 설정 */}
                            <StartPrice
                                handleChange={handlers.handleChange}
                                formData={formData} />

                            {/* 시간 설정 그룹 */}
                            <StartAndEndTime minStartTime={timeLimits.minStartTime}
                                             minEndTime={timeLimits.minEndTime}
                                             handleChange={handlers.handleChange} />
                        </div>

                        {/* 상세 설명 */}
                        <div className="form-section">
                            <div className="input-group">
                                <label className="input-label">Description</label>
                                <textarea
                                    name="description"
                                    rows="6"
                                    value={formData.description}
                                    onChange={handlers.handleChange}
                                    placeholder="Describe your product in detail..."
                                    required />
                            </div>
                        </div>

                        {/* 버튼 섹션 */}
                        <div className="form-actions-fixed">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={status.loading}>
                                {status.loading ? "Processing..." : "Publish Product"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductAddPage;