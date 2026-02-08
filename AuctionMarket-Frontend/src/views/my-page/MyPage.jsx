import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MyProfile from '@/components/my-page/MyProfile.jsx';
import MyBids from '@/components/my-page/MyBids.jsx';
import WonAuctions from '@/components/my-page/WonAuctions.jsx';
import { useAuth } from "@/context/AuthContext.jsx";
import { jwtDecode } from 'jwt-decode';
import './MyPage.css'
import WithdrawnModal from "@/components/user/WithdrawnModal.jsx";

const MyPage = () => {
    const { accessToken, logout } = useAuth();
    const decoded = accessToken ? jwtDecode(accessToken) : null;
    const [activeTab, setActiveTab] = useState('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    if (!decoded) {
        return null;
    }

    console.log(decoded.role);

    const tabMenus = [
        { id: 'profile', label: 'Account Details' },
        { id: 'bids', label: 'My Bids' },
        { id: 'won', label: 'Won Auctions' },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="mypage-vertical-container">
            <h1 className="mypage-main-title">
                {activeTab === 'profile' && <>My Account</>}
                {activeTab === 'bids' && <>My Bids</>}
                {activeTab === 'won' && <>My Won Auctions</>}
            </h1>

            <div className="mypage-layout">
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
                    <button className="vertical-tab-btn logout-btn" onClick={handleLogout}>Log Out</button>
                    <button className="vertical-tab-btn withdrawn-btn" onClick={()=>setIsModalOpen(true)}>회원 탈퇴</button>
                </nav>

                <section className="vertical-tabs-content">
                    {activeTab === 'profile' && <MyProfile decoded={decoded} />}
                    {activeTab === 'bids' && <MyBids decoded={decoded} />}
                    {activeTab === 'won' && <WonAuctions decoded={decoded} />}
                </section>

                <WithdrawnModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    userId={decoded.sub}
                    logout={handleLogout}
                />

            </div>
        </div>
    );
};

export default MyPage;