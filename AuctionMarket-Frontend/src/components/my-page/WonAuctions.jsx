import { useState } from 'react';
import {useMyOrderList} from '@/hooks/order/useMyOrderList.js';
import WonAuctionsList from '@/components/order/order-list/WonAuctionsList.jsx';

const WonAuctions = ({decoded}) => {
    const [params, setParams] = useState({
        page: 0,
    });
    const {data: myOrders, isLoading} = useMyOrderList(decoded.sub, params.page);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>

    const orders = myOrders.data.content.map(o => o);

    return (
        <div style={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        }}>
            <WonAuctionsList myOrders={orders} setParams={setParams}/>
        </div>
    );
};

export default WonAuctions;