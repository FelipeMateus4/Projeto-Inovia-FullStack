import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
    const calendarRef = useRef(null);

    const handleAddEventClick = () => {
        alert('Abrir modal para agendar evento'); // Aqui você pode abrir um modal ou redirecionar
    };

    return (
        <div style={{ padding: '20px' }}>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today, dayGridYear', // Botões padrão de navegação
                    center: 'title', // Título do calendário
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek customButton', // Modos de visualização + botão personalizado
                }}
                customButtons={{
                    customButton: {
                        text: 'Agendar',
                        click: handleAddEventClick,
                    },
                }}
                expandRows={true}
                buttonText={{
                    today: 'Hoje',
                    month: 'Mês',
                    week: 'Semana',
                    day: 'Dia',
                    list: 'Lista',
                }}
                editable={true}
                selectable={true}
                events={[
                    { title: 'Consulta Médica', date: '2024-12-10' },
                    { title: 'Acompanhamento', date: '2024-12-15' },
                ]}
                contentHeight="auto"
            />
        </div>
    );
};

export default Calendar;
