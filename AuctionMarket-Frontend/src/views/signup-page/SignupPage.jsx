// SignupPage.jsx
import React, {useState} from "react";
import "./SignupPage.css";
import AuthLayout from "../layout/AuthLayout.jsx";
import {useSignup} from "../../hooks/useSignup.js";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {signup} = useSignup();

    const handleSignup = async (e) => {
        e.preventDefault();

        const result = await signup(email, username, nickname, phone, password);
        if (result && result.success) {
            alert("회원가입 성공");
            navigate("/login");
        } else {
            // 여기서 alert를 띄우는 것이 UI 흐름상 자연스럽습니다.
            alert("회원가입 실패: " + (result?.message || "서버 연결에 실패했습니다."));
        }
    };

    return (
        <AuthLayout title="Sign up">
            <form onSubmit={handleSignup}>
                <input type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required placeholder="Your email address" />
                <input type="text"
                       value={username}
                       onChange={(u) => setUsername(u.target.value)}
                       required placeholder="Name" />
                <input type="text"
                       value={nickname}
                       onChange={(n) => setNickname(n.target.value)}
                       required placeholder="Nickname" />
                <input type="text"
                       value={phone}
                       onChange={(p) => setPhone(p.target.value)}
                       required placeholder="Phone number" />
                <input type="password"
                       value={password}
                       onChange={(ps) => setPassword(ps.target.value)}
                       required placeholder="Password" />
                <button type="submit" className="signup-btn1"> Sign up </button>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;