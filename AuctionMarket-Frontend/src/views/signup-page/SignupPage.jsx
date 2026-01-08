// SignupPage.jsx
import React from "react";
import "./SignupPage.css";
import AuthLayout from "../layout/AuthLayout.jsx";

const SignupPage = () => {
    return (
        <AuthLayout title="Sign up">
            <form>
                <input type="email" required placeholder="Your email address" />
                <input type="text" required placeholder="Name" />
                <input type="text" required placeholder="Nickname" />
                <input type="text" required placeholder="Phone number" />
                <input type="password" required placeholder="Password" />
                <button type="submit" className="signup-btn1"> Sign up </button>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;