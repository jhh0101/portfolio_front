import { useCountdown } from "@/hooks/useCountdown.js";
import { useRefreshToken } from "@/hooks/useRefreshToken.js";
import {jwtDecode} from 'jwt-decode';

const SessionTimer = (deadline) => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const expireDate = new Date(decoded.exp * 1000);
    const { minutes, seconds } = useCountdown(expireDate);
    const { mutate } = useRefreshToken();

    const isFinished = minutes + seconds === 0;

    const refreshToken = (e) => {
        e.preventDefault();
        mutate();
    };

    return (
        <div className="token-timer">
            {isFinished ? (
                <p className={"d-flex align-items-center mb-0 me-3"}> 로그인 시간 만료 </p>
            ) : (
                <>
                    <p className={"d-flex align-items-center mb-0 me-3"}>
                        <svg width="20" height="20"
                             viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round"
                             style={{marginRight:"5px"}}>
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {minutes}분 {seconds}초
                        <button
                            onClick={refreshToken}
                            className="bg-transparent border-0 p-0 ms-2"
                            style={{ cursor: 'pointer' }}
                            title="로그인 연장"
                        >
                            ↻
                        </button>
                    </p>

                </>
            )}
        </div>
    );
};

export default SessionTimer;