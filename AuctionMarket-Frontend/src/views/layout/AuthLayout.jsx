import React from 'react';
import "./AuthLayout.css"
import authImg from '@/assets/auth-image.jpg' // 공통 이미지

const AuthLayout = ({ title, children }) => {
    return (
        <div className="auth-container">
            {/* 왼쪽: 공통 이미지 섹션 */}
            <div className="auth-image-section">
                <img src={authImg} alt="Auth Illustration" />
            </div>

            {/* 오른쪽: 내용이 바뀌는 폼 섹션 */}
            <div className="auth-form-section">
                <div className="auth-form-wrapper">
                    <h2>{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;