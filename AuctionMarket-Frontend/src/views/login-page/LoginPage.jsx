import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useLogin} from "@/hooks/auth";
import UserLoginButton from "@/views/login-page/components/auth/UserLoginButton.jsx";
import AuthLayout from "@/components/common/layout/AuthLayout.jsx";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        mutate(payload);
    };

    return (
        <AuthLayout title="Sign In">
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name={"email"}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    placeholder="Your email address"
                />

                <input
                    type="password"
                    name={"password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    placeholder="Password"
                />

                <div className="demo-login-section" style={{ margin: '15px 0', textAlign: 'left' }}>
                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                        * 테스트 계정으로 빠르게 둘러보기
                    </p>
                    <div className="demo-buttons">
                        <UserLoginButton emailInput={setEmailInput} passwordInput={setPasswordInput} />
                    </div>
                </div>

                <button type="submit" className="login-btn" disabled={isPending}>
                    {isPending ? "Signing In..." : "Sign In"}
                </button>
                <button type="button" className="signup-btn" onClick={() => navigate('/signup')}> Sign Up </button>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;