import React, { memo, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ProductCard.css';
import AuctionCountdown from "@/components/product/read/end-time/AuctionCountdown.jsx";


const ProductCard = memo(({data}) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const { productResponse, auctionResponse } = data;
    
    const productId = productResponse.productId;

    return (
        <div className={"product-card"}>
            <Link to={`/product/${productId}`}>
                <div className={"product-image-wrapper"}>
                    <img
                        src={productResponse.mainImageUrl}
                        alt={productResponse.title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        style={{ opacity: imageLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out' }}
                    />
                </div>
                <div className={"product-info"}>
                    <h4>{productResponse.title}</h4>
                    <p className={"price"}>현재가 : {auctionResponse.currentPrice.toLocaleString()}원</p>
                    <AuctionCountdown deadline={new Date(auctionResponse.endTime)} />
                </div>
            </Link>
        </div>
    );
});

export default ProductCard;