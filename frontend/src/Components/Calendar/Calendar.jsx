import { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import './Calendar.css';
import { createEventOnServer } from './CreateEvent/CreateEvent';
import AddEventModal from './CreateEvent/AddCalendarContainer';
import { UpdateEventOnServer } from './EditEvent/EditEvent';
import UpdateEventModal from './EditEvent/EditCalendarHtml';

const Calendar = () => {
    const calendarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [eventsData, setEventsData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        nameNutri: '',
        date: '',
        startTime: '',
        endTime: '',
        name: '',
        email: '',
        phone: '',
        Birthdate: '',
        biotipoCorporal: '',
        cpf: '',
        recorrenceDays: '',
        _id: '',
    });

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
                console.log('Consultas obtidas:', data);

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

                console.log('Eventos mapeados:', mappedEvents);
                setEventsData(mappedEvents);
            } catch (error) {
                console.error('Erro de rede:', error);
            }
        };

        fetchEvents();
    }, []);

    const openModal = () => setShowModal(true);

    const closeModal = () => {
        setShowModal(false);
        setFormData({
            nameNutri: '',
            date: '',
            startTime: '',
            endTime: '',
            name: '',
            email: '',
            phone: '',
            Birthdate: '',
            biotipoCorporal: '',
            cpf: '',
            recorrenceDays: '',
            _id: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formDataCopy = { ...formData };

            if (formDataCopy.Birthdate) {
                const [day, month, year] = formDataCopy.Birthdate.split('/');
                formDataCopy.Birthdate = `${year}-${month}-${day}`;
            }
            const updatedEvent = await UpdateEventOnServer(formDataCopy._id, formDataCopy);

            const updatedEvents = eventsData.map((evt) =>
                evt.extendedProps._id === updatedEvent._id ? { ...evt, ...updatedEvent } : evt
            );
            setEventsData(updatedEvents);
            console.log('Evento atualizado:', updatedEvent);

            if (calendarRef.current) {
                calendarRef.current.getApi().refetchEvents();
            }

            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            setError(error.message);
        }
    };

    const handleEventClick = (clickInfo) => {
        console.log('Evento clicado:', clickInfo.event);

        const props = clickInfo.event.extendedProps;

        // Converter data (props.date) para DD/MM/YYYY
        const dateObj = new Date(props.date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        // Converter hora de início (props.startTime) para HH:mm
        const startObj = new Date(props.startTime);
        const startHour = String(startObj.getHours()).padStart(2, '0');
        const startMinute = String(startObj.getMinutes()).padStart(2, '0');
        const formattedStartTime = `${startHour}:${startMinute}`;

        // Converter hora de término (props.endTime) para HH:mm
        const endObj = new Date(props.endTime);
        const endHour = String(endObj.getHours()).padStart(2, '0');
        const endMinute = String(endObj.getMinutes()).padStart(2, '0');
        const formattedEndTime = `${endHour}:${endMinute}`;

        // Converter data de nascimento (props.Birthdate) para DD/MM/YYYY
        const birthObj = new Date(props.Birthdate);
        const birthDay = String(birthObj.getDate()).padStart(2, '0');
        const birthMonth = String(birthObj.getMonth() + 1).padStart(2, '0');
        const birthYear = birthObj.getFullYear();
        const formattedBirthDate = `${birthDay}/${birthMonth}/${birthYear}`;

        // Montar o novo formData com as datas formatadas
        const updatedFormData = {
            ...props,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            Birthdate: formattedBirthDate,
        };

        console.log('Evento selecionado para edição:', updatedFormData);
        setSelectedEvent(clickInfo.event);
        setFormData(updatedFormData);
        openModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventObj = await createEventOnServer(formData);
            setEventsData((prev) => [...prev, eventObj]);
            console.log('Evento criado:', eventObj);
            closeModal();
        } catch (error) {
            console.error('Erro ao criar evento:', error);
            setError(error.message);
        }
    };

    return (
        <div
            className="Scroll"
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'calc(100vh - 300px)',
                overflowY: 'scroll',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                locale={ptBrLocale}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek customButton',
                }}
                customButtons={{
                    customButton: {
                        text: 'Agendar',
                        click: () => openModal(),
                    },
                }}
                expandRows={true}
                editable={true}
                selectable={true}
                events={eventsData}
                contentHeight="auto"
                height="100%"
                eventClick={handleEventClick}
            />

            <AddEventModal
                showModal={showModal}
                closeModal={closeModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
            />
            <UpdateEventModal
                showModal={showModal}
                closeModal={closeModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                error={error}
            />
        </div>
    );
};

export default Calendar;
