import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCardSkeleton = () => {
    return (
        <div className="product-card">
            <Skeleton height={200} />  {/* 이미지 */}
            <Skeleton width="80%" />   {/* 제목 */}
            <Skeleton width="60%" />   {/* 가격 */}
        </div>
    );
};

export default ProductCardSkeleton;