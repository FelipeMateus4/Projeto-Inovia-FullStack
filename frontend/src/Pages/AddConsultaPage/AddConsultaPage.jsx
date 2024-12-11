import { useRef, useState, useEffect } from 'react';
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
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/consultas', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!response.ok) {
                    console.error('Erro ao buscar eventos:', response.statusText);
                    return;
                }

                const data = await response.json();

                const mappedEvents = data.map((evt) => {
                    const mainDate = new Date(evt.date);
                    const year = mainDate.getFullYear();
                    const month = String(mainDate.getMonth() + 1).padStart(2, '0');
                    const day = String(mainDate.getDate()).padStart(2, '0');

                    const startDate = new Date(evt.startTime);
                    const startHours = String(startDate.getHours()).padStart(2, '0');
                    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');

                    const endDate = new Date(evt.endTime);
                    const endHours = String(endDate.getHours()).padStart(2, '0');
                    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

                    const start = `${year}-${month}-${day}T${startHours}:${startMinutes}`;
                    const end = `${year}-${month}-${day}T${endHours}:${endMinutes}`;

                    return {
                        title: `${evt.nameNutri} - ${evt.name}`,
                        start,
                        end,
                        extendedProps: { ...evt },
                    };
                });
                console.log('Eventos:', mappedEvents);
                setEventsData(mappedEvents);
            } catch (error) {
                console.error('Erro de rede:', error);
            }
        };

        fetchEvents();
    }, []);

    const HandleSetData = (viewInfo) => {
        setIsYearView(viewInfo.view.type === 'dayGridYear');
    };

    return (
        <div
            style={{
                padding: '20px',
                overflowY: isYearView ? 'scroll' : 'hidden',
                height: isYearView ? '100vh' : 'auto',
                transition: 'height 0.3s ease',
                position: 'relative',
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
                    center: 'title',
                    right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                expandRows={true}
                editable={false}
                selectable={false}
                events={eventsData}
                contentHeight="auto"
                datesSet={HandleSetData}
            />
        </div>
    );
};

export default Calendar;
