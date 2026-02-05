import { useState } from 'react';
import MyProfile from '@/components/my-page/MyProfile.jsx';
import MyBids from '@/components/my-page/MyBids.jsx';
import WonAuctions from '@/components/my-page/WonAuctions.jsx';
import { useAuth } from "@/context/AuthContext.jsx";
import { jwtDecode } from 'jwt-decode';
import './MyPage.css'

const MyPage = () => {
    const { accessToken } = useAuth();
    const decoded = jwtDecode(accessToken);
    const [activeTab, setActiveTab] = useState('profile');

    const tabMenus = [
        { id: 'profile', label: 'Account Details' },
        { id: 'bids', label: 'My Bids' },
        { id: 'won', label: 'Won Auctions' },
    ];

    return (
        <div className="mypage-vertical-container">
            <h1 className="mypage-main-title">
                {activeTab === 'profile' && <>My Account</>}
                {activeTab === 'bids' && <>My Bids</>}
                {activeTab === 'won' && <>My Won Auctions</>}
            </h1>

            <div className="mypage-layout">
                {/* 좌측 세로 탭 메뉴 */}
                <nav className="vertical-tabs">
                    {tabMenus.map((tab) => (
                        <button
                            key={tab.id}
                            className={`vertical-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                    {/* 로그아웃은 버튼으로 별도 배치 가능 */}
                    <button className="vertical-tab-btn logout-btn">Log Out</button>
                </nav>

                {/* 우측 컨텐츠 영역 */}
                <section className="vertical-tabs-content">
                    {activeTab === 'profile' && <MyProfile decoded={decoded}/>}
                    {activeTab === 'bids' && <MyBids decoded={decoded}/>}
                    {activeTab === 'won' && <WonAuctions />}
                </section>
            </div>
        </div>
    );
};

export default MyPage;