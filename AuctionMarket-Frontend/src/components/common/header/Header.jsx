import React, { memo, useState } from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from "@/context/AuthContext.jsx";
import SessionTimer from "@/components/common/header/session-timer/SessionTimer.jsx";

const Header = memo(() => {
    const { isLoggedIn, user, logout } = useAuth(); // 전역 상태 사용

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout();
        }
    };

    return (
        <header className="header-container">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">
                    <Link to="/" className="text-decoration-none text-dark fw-bold fs-3">
                        Auction<span>.</span>
                    </Link>
                </div>

                {/* 햄버거 버튼 */}
                <button className="hamburger d-md-none" onClick={toggleMenu}>
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* 네비게이션 + 모바일용 사용자 메뉴 */}
                <nav className={`nav-links ${isOpen ? 'd-flex' : 'd-none'} d-md-flex`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
                    <Link to="/ai/chat" onClick={() => setIsOpen(false)}>AI Chat</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
                    {user?.role === 'SELLER' && (
                        <Link to="/product-add" onClick={() => setIsOpen(false)}>Product Add</Link>
                    )}
                    {user?.role === 'ADMIN' && (
                        <Link to="/admin" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    )}

                    {/* --- 모바일 전용 사용자 메뉴 (d-md-none으로 PC에선 숨김) --- */}
                    <div className="mobile-user-menu d-md-none border-top mt-3 pt-3">
                        {isLoggedIn ? (
                            <>
                                <SessionTimer deadline={new Date(Date.now() + 900000)} />
                                <Link to="/mypage" className="btn nav-btn2 w-100 mb-2" onClick={() => setIsOpen(false)}>My Page</Link>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="btn btn-dark nav-btn1 w-100">Log out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn nav-btn2 w-100 mb-2" onClick={() => setIsOpen(false)}>Log In</Link>
                                <Link to="/signup" className="btn btn-dark nav-btn1 w-100" onClick={() => setIsOpen(false)}>Join Now</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* PC 전용 사용자 메뉴 (d-none d-md-flex로 모바일에선 숨김) */}
                <div className="menu d-none d-md-flex align-items-center">
                    {isLoggedIn ? (
                        <>
                            <SessionTimer deadline={new Date(Date.now() + 900000)} />
                            <Link to="/mypage" className="btn nav-btn2">My Page</Link>
                            <button onClick={handleLogout} className="btn btn-dark nav-btn1">Log out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn nav-btn2">Log In</Link>
                            <Link to="/signup" className="btn btn-dark nav-btn1">Join Now</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
});
export default Header;