import React from 'react';
import ProductCard from '../product-card/ProductCard';
import './ProductList.css';

const ProductList = ({title, products}) => {
    return (
        <section className={"product-list"}>
            <div className={"product-header"}>
                <h2>{title}</h2>
                <a href={"/mord"} className={"more-link"}>More Products →</a>
            </div>

            <div className={"product-grid"}>
                {products.map((item) => (
                    <ProductCard key={item.productResponse.productId} data={item} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;