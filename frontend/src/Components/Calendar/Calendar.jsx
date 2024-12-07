import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
    const handleDateClick = (info) => {
        alert(`Data clicada: ${info.dateStr}`);
    };

    return (
        <div>
            <h1>Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" // Visualização inicial: mês
                editable={true} // Permitir edição de eventos
                selectable={true} // Permitir seleção de datas
                contentHeight="auto"
                events={[
                    { title: 'Evento 1', date: '2024-12-10' },
                    { title: 'Evento 2', date: '2024-12-15' },
                ]}
                dateClick={handleDateClick} // Manipulador para cliques em datas]
            />
        </div>
    );
};

export default Calendar;
