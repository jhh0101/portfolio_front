import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
                <div className="user-menu d-flex align-items-center">
                    <Link to="/login" className="login-link me-3">Log In</Link>
                    <Link to="/signup" className="btn btn-dark signup-btn">Join Now</Link>
                </div>

            </div>
        </header>
    );
};
export default Header;