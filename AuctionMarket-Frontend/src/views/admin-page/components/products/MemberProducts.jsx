import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {useUserProducts} from '@/hooks/admin';
import {useCategoryLookup} from '@/hooks/category'
import SearchFilter from "@/components/product/search/SearchFilter.jsx";
import MemberProductList from "./MemberProductList.jsx";

const MemberProducts = ({user}) => {
    const { ref, inView } = useInView();
    const [params, setParams] = useState({
        title: "",
        path: "",
        sort: ""
    });
    const {
        data: userProducts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useUserProducts({
        userId: user.userId,
        searchParams: params
    });
    const { data: lookup = {} } = useCategoryLookup();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>
    const productsAndAuctions = userProducts?.pages.flatMap(page => page.data.content) || [];
    const lastCategoryId = params?.path ? params.path.split('/').pop() : "";
    const categoryName = lookup[String(lastCategoryId)]?.name || "전체 카테고리";

    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "0 50px"
        }}>
                <SearchFilter
                    params={params}
                    setParams={setParams}
                    categoryName={categoryName}
                />
            {productsAndAuctions.length > 0 ? (
                    <MemberProductList
                        productsAndAuctions={productsAndAuctions}
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

export default MemberProducts;