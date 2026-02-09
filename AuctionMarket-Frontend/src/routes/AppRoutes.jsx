import { Routes, Route } from 'react-router-dom';
import MainPage from "@/views/main-page/MainPage.jsx";
import MyPage from "@/views/my-page/MyPage.jsx";
import LoginPage from "@/views/login-page/LoginPage.jsx";
import SignupPage from "@/views/signup-page/SignupPage.jsx";
import ProductAddPage from "@/views/product/product-add-page/ProductAddPage.jsx";
import ProductModifyPage from "@/views/product/product-modify-page/ProductModifyPage.jsx";
import ProductPage from "@/views/product/product-page/ProductPage.jsx";
import PolicyPage from "@/views/policy/PolicyPage.jsx";
import ProductListPage from "@/views/product/product-list-page/ProductListPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/product-add" element={<ProductAddPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/product/modify/:productId" element={<ProductModifyPage />} />
            <Route path="/shop" element={<ProductListPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/terms" element={<PolicyPage type={"terms"} />} />
            <Route path="/privacy" element={<PolicyPage type={"privacy"} />} />
        </Routes>
    );
};

export default AppRoutes;