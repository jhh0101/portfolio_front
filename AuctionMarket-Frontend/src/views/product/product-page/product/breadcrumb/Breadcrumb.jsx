import {Fragment} from 'react';
import { useProductBreadcrumb } from '@/hooks/category'

const Breadcrumb = ({productId}) => {
    const { breadcrumb, productTitle, isLoading } = useProductBreadcrumb(productId);

    if (isLoading) {
        return <div className="loading">로딩 중...</div>;
    }

    return (
        <nav className="breadcrumb">
            <span className="path-item">Home</span>
            {breadcrumb.map((name, index) => (
                <Fragment key={index}>
                    <span className="separator">&gt;</span>
                    <span className="path-item">{name}</span>
                </Fragment>
            ))}
            <span className="separator">&gt;</span>
            <span>{productTitle}</span>
        </nav>
    );
};

export default Breadcrumb;
