import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import MainPage from "./views/main-page/MainPage.jsx";
import LoginPage from "./views/login-page/LoginPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import SignupPage from "./views/signup-page/SignupPage.jsx";
import ProductAddPage from "./views/product/product-add-page/ProductAddPage.jsx";

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
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;