import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../Pages/Calendar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define a rota principal para o Calendar */}
        <Route path="/" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
