const ProductCount = ({info}) => {
    return (
        <>
            <h1 className="product-title">{info.title}</h1>
            <div className="auction-stats-container d-flex gap-2 mb-3">
                <div className="auction-badge view-badge">
                    🔥 조회수 {info.viewCount}
                </div>
                <div className="auction-badge bid-badge">
                    🔨 입찰현황 {info.viewCount}건
                </div>
            </div>
        </>
    );
};

export default ProductCount;