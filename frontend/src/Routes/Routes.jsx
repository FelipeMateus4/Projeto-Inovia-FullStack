import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPage from '../Pages/CalendarPage/CalendarPage';
import AuthPage from '../Pages/AuthPage/AuthPage';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route index element={<PrivateRoute element={<CalendarPage />} />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
