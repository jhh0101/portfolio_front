import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const location = useLocation();

    const updateUserFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setUser({ role: decoded.role }); // 토큰의 role 저장 (예: 'SELLER')
        } catch (error) {
            console.error("토큰 디코딩 실패:", error);
            setUser(null);
        }
    };

    // 3. 앱이 처음 켜질 때 실행
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            updateUserFromToken(token);
        }
    }, []);

    const login = (token) => {
        if (!token || typeof token !== 'string') {
            throw new Error("유효하지 않은 토큰입니다.");
        }

        try {
            const decoded = jwtDecode(token);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new Error("만료된 토큰입니다.");
            }
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            setUser({role: decoded.role});
        } catch (e) {
            console.error("토큰 처리 실패 : ", e);
            throw e;
        }
    };

    // 로그아웃 시 실행할 함수
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) return; // 토큰 없으면 패스

            try {
                const decoded = jwtDecode(token);
                // 작성하신 그 로직이 여기서 매번 돌아야 합니다!
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setUser(null);
                    alert("로그인 시간이 만료되었습니다.");
                    window.location.href = '/login';
                }
            } catch (e) {
                localStorage.removeItem('token');
            }
        };

        checkToken();
    }, [location]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);