import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { authService } from "@/api/authService.js";
import { setApiAccessToken } from "@/api/axios.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const isLoggedIn = !!accessToken;

    const location = useLocation();

    const login = (token) => {
        if (!token || typeof token !== 'string') return;

        try {
            const decoded = jwtDecode(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new Error("만료된 토큰");
            }
            setAccessToken(token);
            setApiAccessToken(token);
            setUser({ role: decoded.role, nickname: decoded.nickname }); // 필요한 정보 저장
            console.log("로그인 처리 완료");
        } catch (e) {
            console.error("토큰 에러:", e);
            logout();
        }
    };

    const logout = () => {
        setAccessToken(null);
        setApiAccessToken(null);
        setUser(null);
    };

    const { mutate: refreshMutate } = useMutation({
        mutationFn: () => authService.refreshToken(),
        onSuccess: (res) => {
            if (res.success) {
                login(res.data);
            } else {
                logout();
            }
        },
        onError: () => {
            logout();
        },
        onSettled: () => {
            setIsInitializing(false);
        }
    });

    useEffect(() => {
        refreshMutate();
    }, []);

    useEffect(() => {
        const checkToken = () => {
            if (!accessToken) return;

            try {
                const decoded = jwtDecode(accessToken);
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    alert("세션이 만료되었습니다.");
                    logout();
                    window.location.href = '/login';
                }
            } catch (e) {
                logout();
            }
        };

        checkToken();
    }, [location, accessToken]);


    if (isInitializing) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);