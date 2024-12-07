import Calendar from '../../Components/Calendar/Calendar';
import './CalendarPage.css';

const CalendarPage = () => {
    return (
        <div className="calendar-page">
            <div className="header">
                <h1>Agendar Sessão</h1>
            </div>
            <div className="calendar-wrapper">
                <Calendar />
            </div>
        </div>
    );
};

export default CalendarPage;
