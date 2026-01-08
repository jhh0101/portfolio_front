import React, {useState} from 'react';
import "./LoginPage.css"
import loginImg from '../../assets/login-image.jpg'
import {useLogin} from "../../hooks/useLogin.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, loading, error} = useLogin();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await login(email, password);

        if (result && result.success) {
            localStorage.setItem('token', result.data); // result.data가 토큰
            navigate('/');
        } else {
            // 훅의 'error' 상태가 아니라 'result.message'를 바로 사용!
            alert("로그인 실패 : " + (result?.message || "알 수 없는 에러"));
        }
    }

    return (
        <div className={"login-container"}>
            <div className={"login-image-section"}>
                <img src={loginImg} alt={"Login Illustration"} />
            </div>

            <div className={"login-form-section"}>
                <div className={"form-wrapper"}>
                    <h2>Sign In</h2>

                    <form onSubmit={handleLogin}>
                        <input type={"email"}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required style={{ width: '100%', padding: '8px' }}
                               placeholder={"Your email address"} />
                        <input type={"password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required style={{ width: '100%', padding: '8px' }}
                               placeholder={"Password"} />

                        <div className={"form-options"}>
                            <label><input type={"checkbox"} /> Remember me </label>
                            <span className={"forgot-password"}> Forgot password?</span>
                        </div>

                        <button type={"submit"} className={"login-btn"}> Sign In </button>
                        <button type="button" className="signup-btn" onClick={() => navigate('/signup')}> Sign Up </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;