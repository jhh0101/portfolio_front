import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { authService } from "@/api/authService.js";
import { setApiAccessToken } from "@/api/axios.js";
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = !!accessToken;

    const decoded = useMemo(() => {
        if (!accessToken) return null;
        try {
            return jwtDecode(accessToken);
        } catch (error) {
            console.error("Token decode error:", error);
            return null;
        }
    }, [accessToken]);

    // 1. 내부 상태만 비우는 함수 (API 호출 X) - 에러 발생 시 안전하게 쓰기 위함
    const clearAuthState = () => {
        setAccessToken(null);
        setApiAccessToken(null);
        setUser(null);
        localStorage.removeItem('isLogin'); // 표식 제거
    };

    const { mutate: logoutMutate } = useMutation({
        mutationFn: (data) => authService.postLogout(data), // { userId } 형태로 받음
        onSuccess: (res) => {
            if (!res.success) {
                // 실패해도 클라이언트는 로그아웃 처리해야 함
                console.warn(res.message || "로그아웃 요청 실패");
            }
            toast.success("로그아웃 성공!");
            navigate('/login');
        },
        onError: (err) => {
            // 서버 로그아웃 실패해도 클라이언트는 강제 로그아웃
            console.error("로그아웃 API 에러:", err);
            navigate('/login');
        }
    });

    const { mutate: refreshMutate } = useMutation({
        mutationFn: () => authService.refreshToken(),
        onSuccess: (res) => {
            if (res.success) {
                login(res.data);
            } else {
                // 리프레시 실패 -> 서버 세션도 죽었으므로 로컬만 비움
                clearAuthState();
            }
        },
        onError: () => {
            // 리프레시 API 에러 -> 로컬만 비움 (서버에 로그아웃 요청 보낼 필요 없음)
            clearAuthState();
        },
        onSettled: () => {
            setIsInitializing(false);
        }
    });

    const login = (token) => {
        if (!token || typeof token !== 'string') return;

        try {
            const decodedToken = jwtDecode(token); // 변수명 충돌 방지
            if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
                throw new Error("만료된 토큰");
            }
            setAccessToken(token);
            setApiAccessToken(token);
            setUser({ role: decodedToken.role, nickname: decodedToken.nickname });

            // ✨ [핵심] 로그인 했다는 표식을 남김
            localStorage.setItem('isLogin', 'true');

        } catch (e) {
            console.error("토큰 에러:", e);
            clearAuthState();
        }
    };

    const logout = () => {
        // 토큰에 정보가 있다면 서버에 로그아웃 요청
        if (decoded?.sub) {
            // ✨ [주의] mutationFn이 ({userId}) 구조 분해를 하므로 객체로 전달해야 함
            logoutMutate({ userId: decoded.sub });
        }

        // 로컬 상태 초기화
        clearAuthState();
    };

    // ✨ [핵심 해결] 새로고침 시 로직 수정
    useEffect(() => {
        const isLoginMark = localStorage.getItem('isLogin');

        // 1. 로그인했던 흔적이 없으면 API 요청 자체를 안 함 (400 에러 해결)
        if (!isLoginMark) {
            setIsInitializing(false);
            return;
        }

        // 2. 흔적이 있을 때만 리프레시 시도
        refreshMutate();
    }, []); // 마운트 시 1회 실행

    // 토큰 만료 체크 (기존 로직 유지)
    useEffect(() => {
        const checkToken = () => {
            if (!accessToken) return;

            try {
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
                    clearAuthState(); // logout() 대신 안전하게 클리어
                    navigate('/login');
                    toast.error("세션이 만료되었습니다.");
                }
            } catch (e) {
                clearAuthState();
                navigate('/login');
            }
        };

        checkToken();
    }, [location, accessToken]);

    if (isInitializing) {
        return null; // 또는 <LoadingSpinner />
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);