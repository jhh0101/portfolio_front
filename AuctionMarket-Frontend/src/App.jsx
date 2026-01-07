import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import MainPage from "./views/main-page/MainPage.jsx";

function App() {
    return (
        <Router>
            {/* 어떤 페이지를 가든 헤더는 항상 상단에 위치함 */}
            <Header />

            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default App;