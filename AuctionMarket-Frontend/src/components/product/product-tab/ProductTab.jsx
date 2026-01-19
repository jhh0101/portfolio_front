const ProductTab = ({info}) => {

    return (
        <>
            <div className="product-tabs">
                <div className="tab-header">
                    <span className="active">Product Description</span>
                    <span>Questions</span>
                    <span>Reviews</span>
                </div>
                <div className="tab-content">
                    <h4>{info.title}</h4>
                    <br/>
                    <p>{info.description}</p>
                </div>
            </div>
        </>
    );
};

export default ProductTab;