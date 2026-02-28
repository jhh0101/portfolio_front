import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {useUserOrders} from '@/hooks/admin';
import MemberOrderList from "./MemberOrderList.jsx";

const MemberOrders = ({user}) => {
    const { ref, inView } = useInView();

    const {
        data: userOrders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useUserOrders({
        userId: user.userId,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>
    const userOrder = userOrders?.pages.flatMap(page => page.data.content) || [];

    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "0 25px",
        }}>

            {userOrder.length > 0 ? (
                    <MemberOrderList
                        userOrders={userOrder}
                        isFetchingNextPage={isFetchingNextPage}
                        ref={ref}
                    />
                ) : (
                    <div className="empty-container">
                        <div className="empty-message">
                            아직 등록한 경매가 없습니다.
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MemberOrders;