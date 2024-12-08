import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import './Calendar.css';

const Calendar = () => {
    const calendarRef = useRef(null);
    const [isYearView, setIsYearView] = useState(false);

    const HandleSetData = (viewInfo) => {
        console.log(viewInfo);
        if (viewInfo.view.type === 'dayGridYear') {
            setIsYearView(true);
        } else {
            setIsYearView(false);
        }
    };

    return (
        <div
            style={{
                padding: '20px',
                overflowY: isYearView ? 'scroll' : 'hidden',
                height: isYearView ? '100vh' : 'auto',
                transition: 'height 0.3s ease',
            }}
        >
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                locale={ptBrLocale}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title', // Título do calendário
                    right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek customButton', // Modos de visualização + botão personalizado
                }}
                customButtons={{
                    customButton: {
                        text: 'Agendar',
                        click: () => alert('Abrir modal para agendar evento'),
                    },
                }}
                expandRows={true}
                editable={true}
                selectable={true}
                events={[
                    { title: 'Consulta Médica', date: '2024-12-10' },
                    { title: 'Acompanhamento', date: '2024-12-15' },
                ]}
                contentHeight="auto"
                datesSet={HandleSetData}
            />
        </div>
    );
};

export default Calendar;
