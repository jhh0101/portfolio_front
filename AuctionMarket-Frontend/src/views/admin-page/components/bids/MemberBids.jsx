import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {useUserBids} from '@/hooks/admin';
import MemberBidsList from "./MemberBidsList.jsx";

const MemberBids = ({user}) => {
    const { ref, inView } = useInView();
    const {
        data: userBids,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useUserBids(user.userId);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>
    const productsAndAuctions = userBids?.pages.flatMap(page => page.data.content) || [];

    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}>
            {productsAndAuctions.length > 0 ? (
                    <MemberBidsList productsAndAuctions={productsAndAuctions} isFetchingNextPage={isFetchingNextPage} ref={ref} user={user}/>
                ) : (
                    <div className="empty-container">
                        <div className="empty-message">
                            아직 참여한 경매가 없습니다.
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MemberBids;