import {useState} from "react";
import {Navigate} from "react-router-dom";
import Members from "./components/user/Members.jsx";

const AdminPage = ({user}) => {
    const [activeTab, setActiveTab] = useState('members');

    if (!user || user.role !== "ADMIN") {
        return <Navigate to={"/"} replace />;
    }

    const tabMenus = [
        { id: 'members', label: 'Member List' },
        { id: 'bids', label: 'My Bids' },
        { id: 'won', label: 'Won Auctions' },
    ];

    return (
        <div className="mypage-vertical-container">
            <h1 className="mypage-main-title">
                {activeTab === 'members' && <>Member List</>}
                {activeTab === 'products' && <>My Products</>}
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
                </nav>

                <section className="vertical-tabs-content">
                    {activeTab === 'members' && <Members />}
                    {/*{activeTab === 'bids' && <MyBids decoded={decoded} />}*/}
                    {/*{activeTab === 'won' && <WonAuctions decoded={decoded} />}*/}
                    {/*{activeTab === 'products' && <MyProducts decoded={decoded} />}*/}
                </section>
            </div>
        </div>
    );
};

export default AdminPage;