import { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import './Calendar.css';
import PropTypes from 'prop-types';
import { createEventOnServer } from './CreateEvent/CreateEvent';
import AddEventModal from './CreateEvent/AddCalendarContainer';
import { UpdateEventOnServer } from './EditEvent/EditEvent';
import UpdateEventModal from './EditEvent/EditCalendarHtml';

const Calendar = () => {
    const calendarRef = useRef(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [error, setError] = useState(null);
    const [eventsData, setEventsData] = useState([]);
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
        displayDate: '',
        displayStartTime: '',
        displayEndTime: '',
        displayBirthDate: '',
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

    const openAddModal = () => {
        setShowAddModal(true);
        setShowUpdateModal(false);
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
            displayDate: '',
            displayStartTime: '',
            displayEndTime: '',
            displayBirthDate: '',
        });
    };

    const openUpdateModal = (event) => {
        setShowUpdateModal(true);
        setShowAddModal(false);

        const props = event.extendedProps;

        // Normalizar datas e horários para UTC
        const normalizeToUTC = (dateString) => new Date(dateString).toISOString();

        const formattedDate = normalizeToUTC(props.date);
        const formattedStartTime = normalizeToUTC(props.startTime);
        const formattedEndTime = normalizeToUTC(props.endTime);
        const formattedBirthDate = normalizeToUTC(props.Birthdate);

        // Transformar datas e horários para formato de exibição
        const formatForDisplay = (dateString) => {
            const dateObj = new Date(dateString);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');

            return {
                date: `${day}/${month}/${year}`,
                time: `${hours}:${minutes}`,
            };
        };

        const displayDate = formatForDisplay(formattedDate).date;
        const displayStartTime = formatForDisplay(formattedStartTime).time;
        const displayEndTime = formatForDisplay(formattedEndTime).time;
        const displayBirthDate = formatForDisplay(formattedBirthDate).date;

        // Atualizar o estado com os dados normalizados e de exibição
        setFormData({
            ...props,
            date: formattedDate, // UTC
            startTime: formattedStartTime, // UTC
            endTime: formattedEndTime, // UTC
            Birthdate: formattedBirthDate, // UTC
            displayDate: displayDate,
            displayStartTime: displayStartTime,
            displayEndTime: displayEndTime,
            displayBirthDate: displayBirthDate,
        });
    };

    const closeModal = () => {
        setShowAddModal(false);
        setShowUpdateModal(false);
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
            displayDate: '',
            displayStartTime: '',
            displayEndTime: '',
            displayBirthDate: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formDataCopy = { ...formData };
            console.log('este é o formdata', formData);

            if ('displayDate' in formDataCopy) delete formDataCopy.displayDate;
            if ('displayStartTime' in formDataCopy) delete formDataCopy.displayStartTime;
            if ('displayEndTime' in formDataCopy) delete formDataCopy.displayEndTime;
            if ('displayBirthDate' in formDataCopy) delete formDataCopy.displayBirthDate;

            formDataCopy.date = formData.displayDate;
            formDataCopy.startTime = formData.displayStartTime;
            formDataCopy.endTime = formData.displayEndTime;

            if (formDataCopy.Birthdate) {
                const [day, month, year] = formDataCopy.Birthdate.split('/');
                formDataCopy.Birthdate = `${year}-${month}-${day}`;
                formDataCopy.Birthdate = new Date(formDataCopy.Birthdate);
            }

            console.log('Dados enviados para atualizaçãoaaaaaaa:', formDataCopy);
            const updatedEvent = await UpdateEventOnServer(formDataCopy._id, formDataCopy);
            setEventsData((prev) =>
                prev.map((evt) => (evt.extendedProps._id === updatedEvent._id ? { ...evt, ...updatedEvent } : evt))
            );
            console.log('Evento atualizado:', updatedEvent);
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
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
                        click: () => openAddModal(),
                    },
                }}
                expandRows={true}
                editable={true}
                selectable={true}
                events={eventsData}
                contentHeight="auto"
                height="100%"
                eventClick={(clickInfo) => openUpdateModal(clickInfo.event)}
            />

            <AddEventModal
                showModal={showAddModal}
                closeModal={closeModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
            />
            <UpdateEventModal
                showModal={showUpdateModal}
                closeModal={closeModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                error={error}
            />
        </div>
    );
};

Calendar.propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    date: PropTypes.string,
    Birthdate: PropTypes.string,
    nameNutri: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    biotipoCorporal: PropTypes.string,
    cpf: PropTypes.string,
    recorrenceDays: PropTypes.string,
    _id: PropTypes.string,
};

export default Calendar;
