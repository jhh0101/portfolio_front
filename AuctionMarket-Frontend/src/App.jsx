import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/context/AuthContext.jsx";
import Header from '@/components/common/header/Header.jsx';
import Footer from "@/components/common/footer/Footer.jsx";
import AppRoutes from "@/routes/AppRoutes.jsx";

function App() {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                <AuthProvider>
                    <Header />
                    <AppRoutes />
                    <Footer />
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;