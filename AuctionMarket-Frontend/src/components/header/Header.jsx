import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login');
        }
    };

    return (
        <header className={"header-container"}>
            <div className={"container d-flex align-items-center justify-content-between"}>
                <div className={"logo"}>
                    <Link to="/" className="text-decoration-none text-dark fw-bold fs-3">
                        Auction<span>.</span>
                    </Link>
                </div>

                {/* 네비게이션 (Nav) */}
                <nav className="nav-links d-none d-md-flex">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/product">Product</Link>
                    <Link to="/contact">Contact Us</Link>
                </nav>

                {/* 사용자 메뉴 */}
                {isLoggedIn ? (
                    <div className={"menu d-flex align-items-center"}>
                        <Link to={"/mypage"} className={"btn nav-btn2"}>My Page</Link>
                        <button onClick={handleLogout} className={"btn btn-dark nav-btn1"}>Logout</button>
                    </div>
                    ) : (
                    <div className="menu d-flex align-items-center">
                        <Link to="/login" className="btn nav-btn2">Log In</Link>
                        <Link to="/signup" className="btn btn-dark nav-btn1">Join Now</Link>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Header;