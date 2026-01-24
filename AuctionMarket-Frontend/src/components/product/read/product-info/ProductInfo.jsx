const ProductInfo = ({info}) => {

    const startTime = new Date(info.startTime).toLocaleString();
    const endTime = new Date(info.endTime).toLocaleString();
    const startPrice = info.startPrice.toLocaleString();
    const currentPrice = info.currentPrice.toLocaleString();

    return (
        <>
            <div className="product-time">
                <div className="product-price-div">
                    Start Time&nbsp;:
                    <span className="start-time">{startTime}</span>
                </div>
                <div className="product-price-div">
                    End Time &nbsp; :
                    <span className="end-time">{endTime}</span>
                </div>
            </div>

            <div className="product-price">
                <div className="product-price-div">
                    Start Price :
                    <span className="start-price">{startPrice}원</span>
                </div>
                <div className="product-price-div">
                    Current Price :
                    <span className="current-price">{currentPrice}원</span>
                </div>
            </div>
        </>
    );
};

export default ProductInfo;