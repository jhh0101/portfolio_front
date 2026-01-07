import React from "react";
import './MainPage.css'
import MainBanner from "../../components/main-banner/MainBanner.jsx";

const MainPage = () => {
    return (
        <div className="main-page">
            {/* 1. 배너 섹션 */}
            <MainBanner />
        </div>
    );
};

export default MainPage;