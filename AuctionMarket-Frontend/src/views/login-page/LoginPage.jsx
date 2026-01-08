// LoginPage.jsx
import React, {useState} from 'react';
import {useLogin} from "../../hooks/useLogin.js";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import "./LoginPage.css";
import AuthLayout from "../layout/AuthLayout.jsx"; // 버튼 등 전용 스타일만 남김

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useLogin();
    const { login: authLogin } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result && result.success) {
            authLogin(result.data);
            navigate('/');
        } else {
            // 여기서 alert를 띄우는 것이 UI 흐름상 자연스럽습니다.
            alert("로그인 실패: " + (result?.message || "서버 연결에 실패했습니다."));
        }
    };

    return (
        <AuthLayout title="Sign In">
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Your email address" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />

                <div className="form-options">
                    <label><input type="checkbox" /> Remember me </label>
                    <Link to={"/forgot"} className="forgot-password"> Forgot password?</Link>
                </div>

                <button type="submit" className="login-btn"> Sign In </button>
                <button type="button" className="signup-btn" onClick={() => navigate('/signup')}> Sign Up </button>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;