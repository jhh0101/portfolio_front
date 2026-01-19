import React from 'react';
import { useProductBreadcrumb } from '../../../hooks/useProductBreadcrumb.js'

const Breadcrumb = ({productId}) => {
    const { breadcrumb, productTitle, isLoading } = useProductBreadcrumb(productId);

    if (isLoading) {
        return <div className="loading">로딩 중...</div>;
    }

    return (
        <div>
            <span>CATEGORY :</span>
            {breadcrumb.map((name, index) => (
                <span key={index}>{""} {name} &gt; </span>
            ))}
            <span> {productTitle} </span>
        </div>
    );
};

export default Breadcrumb;
