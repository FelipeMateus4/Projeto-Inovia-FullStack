import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPage from './Pages/CalendarPage/CalendarPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<CalendarPage />} />
            </Routes>
        </Router>
    );
}

export default App;
