import React from 'react';
import './ProductCard.css';

const ProductCard = ({data}) => {

    const { productResponse, auctionResponse } = data;

    return (
        <div className={"product-card"}>
            <img src={productResponse.mainImageUrl} alt={productResponse.title}/>
            <h3>{productResponse.title}</h3>
            <p className={"price"}>현재가 : {auctionResponse.currentPrice}원</p>
        </div>
    );
};

export default ProductCard;