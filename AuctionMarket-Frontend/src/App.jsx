import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import MainPage from "./views/main-page/MainPage.jsx";
import LoginPage from "./views/login-page/LoginPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import SignupPage from "./views/signup-page/SignupPage.jsx";
import AuthLayout from "./views/layout/AuthLayout.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    {/* 로그인 주소로 접속하면 AuthLayout 안에 LoginPage를 넣음 */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;