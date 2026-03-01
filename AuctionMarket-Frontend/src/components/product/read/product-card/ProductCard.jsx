import React, { memo, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ProductCard.css';
import AuctionCountdown from "@/components/product/read/end-time/AuctionCountdown.jsx";


const ProductCard = memo(({data}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [now, setNow] = useState(new Date());
    const { productResponse, auctionResponse } = data;
    
    const productId = productResponse.productId;

    const startTime = new Date(auctionResponse?.startTime)
    let isStart = startTime > now;

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
                    <h4 className={"mt-3"}>{productResponse.title}</h4>
                    <p className={"price mb-0"}>현재가</p>
                    <p className={"price"}>{auctionResponse.currentPrice.toLocaleString()}원</p>
                    
                    {isStart ? (
                        <AuctionCountdown key="upcoming" mode={"upcoming"} deadline={auctionResponse?.startTime} />
                    ) : (
                        <AuctionCountdown key="active" deadline={auctionResponse?.endTime} />
                    )}
                </div>
            </Link>
        </div>
    );
});

export default ProductCard;