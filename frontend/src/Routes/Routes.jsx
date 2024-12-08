import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPage from '../Pages/CalendarPage/CalendarPage';
import AuthPage from '../Pages/AuthPage/AuthPage';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Define a rota principal para o Calendar */}
                <Route index element={<CalendarPage />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
