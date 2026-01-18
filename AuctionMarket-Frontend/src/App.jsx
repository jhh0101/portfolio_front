import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import MainPage from "./views/main-page/MainPage.jsx";
import LoginPage from "./views/login-page/LoginPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import SignupPage from "./views/signup-page/SignupPage.jsx";
import ProductAddPage from "./views/product/product-add-page/ProductAddPage.jsx";
import ProductPage from "./views/product/product-page/ProductPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import PolicyPage from "./views/policy/PolicyPage.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/product-add" element={<ProductAddPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                    <Route path="/terms" element={<PolicyPage type={"terms"} />} />
                    <Route path="/privacy" element={<PolicyPage type={"privacy"} />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;