import { useState } from 'react';
import {useApplyList} from '@/hooks/admin';
import Pagination from "@/components/common/pagination/Pagination.jsx";
import ApplyList from "./ApplyList.jsx";

const Application = () => {
    const [params, setParams] = useState({
        page: 0,
        size: 10,
    });

    const {data: applyList, isLoading} = useApplyList(params);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>
    const apply = applyList.data.content.map(user => user);

    return (
        <div style={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        }}>
            {applyList.data?.content?.length > 0 ? (
                <ApplyList apply={apply}/>
            ) : (
                <div className="empty-container">
                    <div className="empty-message">
                        신청자가 존재하지 않습니다!
                    </div>
                </div>
            )
            }
            <div style={{ marginTop: 'auto' }}>
                <Pagination pageInfo={{totalPages: applyList.data?.totalPages, number: applyList.data?.number}} setParams={setParams} />
            </div>
        </div>
    );
};

export default Application;