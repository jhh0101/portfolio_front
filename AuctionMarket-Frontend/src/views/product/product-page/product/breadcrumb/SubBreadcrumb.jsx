import { useProductBreadcrumb } from '@/hooks/category'

const Breadcrumb = ({productId}) => {
    const { breadcrumb, productTitle, isLoading } = useProductBreadcrumb(productId);

    if (isLoading) {
        return <div className="loading">로딩 중...</div>;
    }

    return (
        /* 여기에 클래스명을 추가했습니다 */
        <div className="breadcrumb">
            <span className="breadcrumb-label">CATEGORY :</span>
            {breadcrumb.map((name, index) => (
                <span key={index}> {name} &gt; </span>
            ))}
            <span className="breadcrumb-title"> {productTitle} </span>
        </div>
    );
};

export default Breadcrumb;