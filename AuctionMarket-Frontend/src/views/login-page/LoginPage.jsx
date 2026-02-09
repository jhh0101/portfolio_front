import {Link, useNavigate} from "react-router-dom";
import {useLogin} from "@/hooks/auth";
import AuthLayout from "@/components/common/layout/AuthLayout.jsx";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        mutate(payload);
    };

    return (
        <AuthLayout title="Sign In">
            <form onSubmit={handleLogin}>
                <input type="email" name={"email"} required placeholder="Your email address" />
                <input type="password" name={"password"} required placeholder="Password" />

                <div className="form-options">
                    <label><input type="checkbox" /> Remember me </label>
                    <Link to={"/forgot"} className="forgot-password"> Forgot password?</Link>
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