import React, { memo } from "react";
import './Footer.css'
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = memo(() => {
    return (
        <footer className={"footer-container"}>
            <div className={"d-flex align-items-center justify-content-between text-white"}>
                <div className={"logo"}>
                    <Link to="/" className="text-decoration-none text-white fw-bold fs-3">
                        Auction<span>.</span>
                    </Link>
                </div>
                <nav className="nav-links d-none d-md-flex ">
                    <Link to="/" className={"text-white"}>Home</Link>
                    <Link to="/shop" className={"text-white"}>Shop</Link>
                    <Link to="/product" className={"text-white"}>Product</Link>
                    <Link to="/contact" className={"text-white"}>Contact Us</Link>
                </nav>
            </div>
            <br/>
            <hr className={"footer-hr"}/>
            <div className={"d-flex align-items-center justify-content-between text-white"}>
                <div className={"copyright d-inline-flex align-items-center"}>
                    <span>Copyright © 2026 Auction. All rights reserved</span>
                    <Link to={"/privacy"} className={"privacy-policy"}>Privacy Policy</Link>
                    <Link to={"/terms"} className={"terms-of-use"}>Terms of Use</Link>
                </div>
                <a href={"https://github.com/jhh0101/portfolio"} target={"_blank"}> <FaGithub className={"git-icon"}/>
                </a>
            </div>
        </footer>
    )
});

export default Footer;