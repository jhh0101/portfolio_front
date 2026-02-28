import {useState, useEffect} from 'react';
import {useCountdown} from "@/hooks/common/useCountdown.js";
import './AuctionCountdown.css';

const AuctionCountdown = ({ deadline, mode="active"}) => {
    const { days, hours, minutes, seconds } = useCountdown(deadline);

    const config = {
        upcoming: { label: "오픈 까지", color: "blue" },
        active:   { label: "남은 시간", color: "red" }
    };

    const current = config[mode];

    const isFinished = days + hours + minutes + seconds === 0;

    if (isFinished && mode === "upcoming") {
        return <div style={{fontSize: "15px"}}>로딩 중...</div>;
    }

    return (
        <div className="auction-card">
            {isFinished && mode === "active"? (
                <p style={{ color: 'gray' }}>경매가 종료되었습니다.</p>
            ) : (
                <p style={{ color: 'red' }}>
                    {current.label}: {days}일 {hours}:{minutes}:{seconds}
                </p>
            )}
        </div>
    );
};

export default AuctionCountdown;