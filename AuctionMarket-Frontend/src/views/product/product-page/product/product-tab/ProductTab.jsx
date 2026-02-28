import { useState } from 'react';
import BidderList from "@/components/bid/bidder-list/BidderList.jsx";

const ProductTab = ({productInfo, bidder, isBidderLoading}) => {
    const [activeTab, setActiveTab] = useState('description');
    return (
        <>
            <div className="product-tabs">
                <div className="tab-header">
                    <span
                        className={activeTab === 'description' ? 'active' : ''}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </span>
                    <span
                        className={activeTab === 'bidder' ? 'active' : ''}
                        onClick={() => setActiveTab('bidder')}
                    >
                        Bidder
                    </span>
                </div>
                <div className="tab-content">
                    {activeTab === 'description' ? (
                        <div>
                            <h4>{productInfo.title}</h4>
                            <br/>
                            <p>{productInfo.description}</p>
                        </div>
                    ) : (
                        <div style={{height: "750px"}}>
                            <BidderList bidder={bidder} isBidderLoading={isBidderLoading} productInfo={productInfo} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductTab;