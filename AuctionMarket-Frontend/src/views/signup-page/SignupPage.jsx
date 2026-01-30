// SignupPage.jsx
import React, {useState} from "react";
import "./SignupPage.css";
import AuthLayout from "@/views/layout/AuthLayout.jsx";
import {useSignup} from "@/hooks/user/useSignup.js";

const SignupPage = () => {
    const { mutate, isPending } = useSignup();

    const handleSignup = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
        mutate(payload);
    };

    return (
        <AuthLayout title="Sign up">
            <form onSubmit={handleSignup}>
                <input type="email"
                       name="email"
                       required placeholder="Your email address" />
                <input type="text"
                       name="username"
                       required placeholder="Name" />
                <input type="text"
                       name="nickname"
                       required placeholder="Nickname" />
                <input type="text"
                       name="phone"
                       required placeholder="Phone number" />
                <input type="password"
                       name="password"
                       required placeholder="Password" />
                <button type="submit" className="signup-btn1" disabled={isPending}> {isPending ? "Signing up..." : "Sign up"} </button>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;