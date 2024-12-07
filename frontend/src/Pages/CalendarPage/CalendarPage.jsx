import Calendar from '../../Components/Calendar/Calendar';
import './CalendarPage.css';
import { Header } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const CalendarPage = () => {
    return (
        <div>
            <Header />
            <div className="calendar-page">
                <div className="calendar-wrapper">
                    <Calendar />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default CalendarPage;
