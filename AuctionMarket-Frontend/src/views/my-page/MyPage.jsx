import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "@/context/AuthContext.jsx";
import MyProfile from '@/views/my-page/components/profile/MyProfile.jsx';
import WonAuctions from '@/views/my-page/components/orders/WonAuctions.jsx';
import MyBids from '@/views/my-page/components/bids/MyBids.jsx';
import MyProducts from "@/views/my-page/components/products/MyProducts.jsx";
import WithdrawnModal from "@/views/my-page/components/user/WithdrawnModal.jsx";
import './MyPage.css'

const MyPage = () => {
    const { accessToken, logout } = useAuth();
    const decoded = accessToken ? jwtDecode(accessToken) : null;
    const [activeTab, setActiveTab] = useState('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    if (!decoded) {
        return null;
    }

    const tabMenus = [
        { id: 'profile', label: 'Account Details' },
        { id: 'bids', label: 'My Bids' },
        { id: 'won', label: 'Won Auctions' },
    ];

    if (decoded.role ==='SELLER'){
        tabMenus.push({ id: 'products', label: 'My Products' })
    }

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
                {activeTab === 'products' && <>My Products</>}
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
                    {activeTab === 'products' && <MyProducts decoded={decoded} />}
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