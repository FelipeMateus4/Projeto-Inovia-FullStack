import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Calendar from './Pages/Calendar';

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Calendar />} />
            </Routes>
        </Router>
    );
}

export default App;
