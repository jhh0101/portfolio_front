import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    // 로그인 시 실행할 함수
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    // 로그아웃 시 실행할 함수
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);