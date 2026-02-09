import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useMyOrderList} from '@/hooks/order';
import Pagination from "@/components/common/pagination/Pagination.jsx";
import WonAuctionsList from './WonAuctionsList.jsx';

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
            {myOrders.data?.content?.length > 0 ? (
                <div style={{
                    minHeight: "85vh",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <WonAuctionsList myOrders={orders} setParams={setParams}/>
                </div>
            ) : (
                <div className="empty-container">
                    <div className="empty-message">
                        아직 낙찰한 경매가 없습니다. <br/>
                        경매에 참여해보세요!
                    </div>
                    <Link to="/shop" className="btn-black">
                        경매 목록 보러가기
                    </Link>
                </div>
                )
            }
            <div style={{ marginTop: 'auto' }}>
                <Pagination pageInfo={{totalPages: myOrders.data?.totalPages, number: myOrders.data?.number}} setParams={setParams} />
            </div>
        </div>
    );
};

export default WonAuctions;