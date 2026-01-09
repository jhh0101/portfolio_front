import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);

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

    // 로그인 시 실행할 함수
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        updateUserFromToken(token);
    };

    // 로그아웃 시 실행할 함수
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);