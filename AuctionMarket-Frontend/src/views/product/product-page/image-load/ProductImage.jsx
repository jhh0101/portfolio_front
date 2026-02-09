import {useProductImage} from "@/hooks/product";
import {useState, useEffect} from "react";

const ProductImage = ({productId}) => {

    const { images, isLoading: isImagesLoading } = useProductImage(productId);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (images.length > 0) {
            const isCurrentValid = images.some(img => img.imageUrl === selectedImage);

            if (!isCurrentValid) {
                setSelectedImage(images[0].imageUrl);
            }
        }
    }, [images]);

    if (isImagesLoading) {
        return <div className="loading">로딩 중...</div>;
    }

    return (
        <div className="product-gallery">
            <div className="main-image">
                {/* 선택된 이미지 출력 */}
                <img src={selectedImage} alt="Main Image" />
            </div>
            <div className="thumbnail-list">
                {images.map((thumb) => (
                    <img
                        key={thumb.imageId}
                        src={thumb.imageUrl}
                        alt={`Sub Image ${thumb.imageOrder}`}
                        // 클릭 시 메인 이미지 변경
                        onClick={() => setSelectedImage(thumb.imageUrl)}
                        className={selectedImage === thumb.imageUrl ? "active" : ""}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    )
};

export default ProductImage;