import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useMyBids} from '@/hooks/bid/useMyBids.js';
import MyBidsList from "@/components/bid/my-page-bids/MyBidsList.jsx";
import Pagination from "@/components/common/pagination/Pagination.jsx";

const MyBids = ({decoded}) => {
    const [params, setParams] = useState({
        page: 0,
    });

    const {data: myBids, isLoading} = useMyBids(decoded.sub, params.page);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>
    const productsAndAuctions = myBids.data.content.map(bid => bid);

    return (
        <div style={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        }}>
            {myBids.data?.content?.length > 0 ? (
                    <MyBidsList productsAndAuctions={productsAndAuctions}/>
                ) : (
                    <div className="empty-container">
                        <div className="empty-message">
                            아직 참여한 경매가 없습니다. <br/>
                            경매에 참여해보세요!
                        </div>
                        <Link to="/shop" className="btn-black">
                            경매 목록 보러가기
                        </Link>
                    </div>
                )
            }
            <div style={{ marginTop: 'auto' }}>
                <Pagination pageInfo={{totalPages: myBids.data?.totalPages, number: myBids.data?.number}} setParams={setParams} />
            </div>
        </div>
    );
};

export default MyBids;