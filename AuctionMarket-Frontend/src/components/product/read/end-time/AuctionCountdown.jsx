import React from 'react';
import {useCountdown} from "@/hooks/common/useCountdown.js";
import './AuctionCountdown.css';

const AuctionCountdown = ({ deadline }) => {
    const { days, hours, minutes, seconds } = useCountdown(deadline);

    // 모든 값이 0이면 경매 종료 표시
    const isFinished = days + hours + minutes + seconds === 0;

    return (
        <div className="auction-card">
            {isFinished ? (
                <p style={{ color: 'gray' }}>경매가 종료되었습니다.</p>
            ) : (
                <p style={{ color: 'red' }}>
                    남은 시간: {days}일 {hours}:{minutes}:{seconds}
                </p>
            )}
        </div>
    );
};

export default AuctionCountdown;