import React from 'react';
import './ProductCard.css';
import AuctionCountdown from "../end-time/AuctionCountdown.jsx";

const ProductCard = ({data}) => {

    const { productResponse, auctionResponse } = data;
    const productId = productResponse.productId;

    return (
        <div className={"product-card"}>
            <a href={`/product/${productId}`}>
                <div className={"product-image-wrapper"}>
                    <img src={productResponse.mainImageUrl} alt={productResponse.title}/>
                </div>
                <div className={"product-info"}>
                    <h4>{productResponse.title}</h4>
                    <p className={"price"}>현재가 : {auctionResponse.currentPrice.toLocaleString()}원</p>
                    <AuctionCountdown deadline={new Date(auctionResponse.endTime)} />
                </div>
            </a>
        </div>
    );
};

export default ProductCard;