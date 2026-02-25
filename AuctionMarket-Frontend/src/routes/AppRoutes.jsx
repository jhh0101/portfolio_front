import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "@/context/AuthContext.jsx";
import MainPage from "@/views/main-page/MainPage.jsx";
import MyPage from "@/views/my-page/MyPage.jsx";
import LoginPage from "@/views/login-page/LoginPage.jsx";
import SignupPage from "@/views/signup-page/SignupPage.jsx";
import ProductAddPage from "@/views/product/product-add-page/ProductAddPage.jsx";
import ProductModifyPage from "@/views/product/product-modify-page/ProductModifyPage.jsx";
import ProductPage from "@/views/product/product-page/ProductPage.jsx";
import PolicyPage from "@/views/policy/PolicyPage.jsx";
import ProductListPage from "@/views/product/product-list-page/ProductListPage.jsx";
import AdminPage from "@/views/admin-page/AdminPage.jsx";
import SuccessPage from "@/views/my-page/components/toss/success/SuccessPage.jsx";
import AiChatView from "@/views/ai-chat-page/AiChatView.jsx";

const AppRoutes = () => {
    const {accessToken} = useAuth();
    const user = accessToken ? jwtDecode(accessToken) : null;
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/product-add" element={<ProductAddPage/>} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/product/modify/:productId" element={<ProductModifyPage />} />
            <Route path="/shop" element={<ProductListPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/terms" element={<PolicyPage type={"terms"} />} />
            <Route path="/privacy" element={<PolicyPage type={"privacy"} />} />
            <Route path="/admin" element={<AdminPage user={user} />} />
            <Route path="/payment/success" element={<SuccessPage user={user} />} />
            <Route path="/ai/chat" element={<AiChatView />} />
        </Routes>
    );
};

export default AppRoutes;