import {useState} from "react";
import {Navigate} from "react-router-dom";
import Members from "@/views/admin-page/components/user/Members.jsx";
import Application from "@/views/admin-page/components/seller/Application.jsx";

const AdminPage = ({user}) => {
    const [activeTab, setActiveTab] = useState('members');

    if (!user || user.role !== "ADMIN") {
        return <Navigate to={"/"} replace />;
    }

    const tabMenus = [
        { id: 'members', label: 'Member List' },
        { id: 'apply', label: 'Apply List' },
    ];

    return (
        <div className="mypage-vertical-container">
            <h1 className="mypage-main-title">
                {activeTab === 'members' && <>Member List</>}
                {activeTab === 'apply' && <>Apply List</>}
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
                    {activeTab === 'apply' && <Application />}
                </section>
            </div>
        </div>
    );
};

export default AdminPage;