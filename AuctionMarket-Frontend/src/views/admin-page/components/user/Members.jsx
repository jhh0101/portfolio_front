import { useState } from 'react';
import {useUserList} from '@/hooks/admin';
import Pagination from "@/components/common/pagination/Pagination.jsx";
import MemberList from "./MemberList.jsx"

const Members = () => {
    const [params, setParams] = useState({
        email: "",
        nickname: "",
        status: "",
        page: 0,
        size: 10,
    });

    const {data: userList, isLoading} = useUserList(params);

    if (isLoading) return <div style={{textAlign: "center"}}>로딩 중 ...</div>
    const users = userList.data.content.map(user => user);

    return (
        <div style={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        }}>
            {userList.data?.content?.length > 0 ? (
                <MemberList users={users}/>
            ) : (
                <div className="empty-container">
                    <div className="empty-message">
                        사용자가 존재하지 않습니다!
                    </div>
                </div>
            )
            }
            <div style={{ marginTop: 'auto' }}>
                <Pagination pageInfo={{totalPages: userList.data?.totalPages, number: userList.data?.number}} setParams={setParams} />
            </div>
        </div>
    );
};

export default Members;