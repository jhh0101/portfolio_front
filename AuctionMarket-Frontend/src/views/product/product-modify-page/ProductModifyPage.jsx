import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail, useProductEdit } from "@/hooks/product";
import CategorySelector from "@/components/category/CategorySelector.jsx";
import ImageUpload from '@/components/image/image-upload/ImageUpload.jsx';
import StartPrice from "@/components/product/write/product-add-price/StartPrice.jsx";
import StartAndEndTime from "@/components/product/write/product-add-time/StartAndEndTime.jsx";

const ProductModifyPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    // 1. 상세 데이터 패칭
    const { product, isLoading: isProductLoading } = useProductDetail(productId);

    // 2. 커스텀 훅 연결 (productId와 로드된 product 데이터 전달)
    const {
        formData,
        imageStates,
        timeLimits,
        handlers,
        status,
    } = useProductEdit(productId, product);

    if (isProductLoading) return <div>로딩 중...</div>;
    if (!product) return <div>상품 정보를 불러올 수 없습니다.</div>;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Modify Product</h2>
                <p>Modify auction items</p>
            </div>

            <form className="product-add-form" onSubmit={handlers.handleSubmit}>
                <div className="form-grid">
                    {/* 왼쪽: 이미지 섹션 */}
                    <div className="image-upload-section">
                        <ImageUpload
                            imageFiles={imageStates.newFiles}
                            setImageFiles={imageStates.setNewFiles}
                            existingImages={imageStates.existingImages}
                            onRemoveExisting={handlers.handleRemoveExisting}
                        />
                    </div>

                    {/* 오른쪽: 상세 정보 입력 섹션 */}
                    <div className="info-input-section">
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

                        <div className="form-section">
                            <CategorySelector
                                onSelect={handlers.handleCategorySelect}
                                initialCategoryId={formData.categoryId}
                                mode={"modify"} />
                        </div>

                        <div className="details-row">
                            <StartPrice
                                handleChange={handlers.handleChange}
                                formData={formData} />

                            <StartAndEndTime
                                minStartTime={timeLimits.minStartTime}
                                minEndTime={timeLimits.minEndTime}
                                endTime={formData.endTime}
                                handleChange={handlers.handleChange} />
                        </div>

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
                                disabled={status.isPending}>
                                {status.isPending ? "Updating..." : "Update Product"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductModifyPage;