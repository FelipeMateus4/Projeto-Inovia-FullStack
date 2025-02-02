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
import { UpdateEventOnServer } from './OptionsEvent/OptionsEvent';
import UpdateEventModal from './OptionsEvent/optionsCalendarContainer';
import { DeleteEventOnServer } from './OptionsEvent/OptionsEvent';
import { GetUserEventsFromServer } from './OptionsEvent/OptionsEvent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import StatisticsModal from './StaticsContainer';

const API_URL = import.meta.env.VITE_API_URL;

const Calendar = () => {
    const calendarRef = useRef(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [error, setError] = useState(null);
    const [eventsData, setEventsData] = useState([]);
    const [showStatisticsModal, setShowStatisticsModal] = useState(false);
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

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${API_URL}/consultas`, {
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
                const year = mainDate.getUTCFullYear();
                const month = String(mainDate.getUTCMonth() + 1).padStart(2, '0');
                const day = String(mainDate.getUTCDate()).padStart(2, '0');

                const startDate = new Date(evt.startTime);
                const startHours = String(startDate.getUTCHours()).padStart(2, '0');
                const startMinutes = String(startDate.getUTCMinutes()).padStart(2, '0');

                const endDate = new Date(evt.endTime);
                const endHours = String(endDate.getUTCHours()).padStart(2, '0');
                const endMinutes = String(endDate.getUTCMinutes()).padStart(2, '0');

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

    useEffect(() => {
        fetchEvents();

        const intervalId = setInterval(() => {
            fetchEvents();
        }, 30000);

        return () => clearInterval(intervalId);
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

        const formattedDate = props.date;
        const formattedStartTime = props.startTime;
        const formattedEndTime = props.endTime;
        const formattedBirthDate = props.Birthdate;

        const formatForDisplay = (dateString) => {
            const dateObj = new Date(dateString);
            const day = String(dateObj.getUTCDate()).padStart(2, '0');
            const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const year = dateObj.getUTCFullYear();
            const hours = String(dateObj.getUTCHours()).padStart(2, '0');
            const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

            return {
                date: `${day}/${month}/${year}`,
                time: `${hours}:${minutes}`,
            };
        };

        const displayDate = formatForDisplay(formattedDate).date;
        const displayStartTime = formatForDisplay(formattedStartTime).time;
        const displayEndTime = formatForDisplay(formattedEndTime).time;
        const displayBirthDate = formatForDisplay(formattedBirthDate).date;

        setFormData({
            ...props,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            Birthdate: formattedBirthDate,
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

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await DeleteEventOnServer(formData._id);
            toast.success('Evento deletado com sucesso!');
            closeModal();
            await fetchEvents();
        } catch (error) {
            console.error('Algum erro ocorreu ao tentar deletar a consulta:', error);
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEventOnServer(formData);
            toast.success('Evento criado com sucesso!');
            closeModal();
            await fetchEvents();
        } catch (error) {
            console.error('Erro ao criar evento:', error);
            setError(error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formDataCopy = { ...formData };

            if ('displayDate' in formDataCopy) delete formDataCopy.displayDate;
            if ('displayStartTime' in formDataCopy) delete formDataCopy.displayStartTime;
            if ('displayEndTime' in formDataCopy) delete formDataCopy.displayEndTime;
            if ('displayBirthDate' in formDataCopy) delete formDataCopy.displayBirthDate;

            formDataCopy.date = formData.displayDate;
            formDataCopy.startTime = formData.displayStartTime;
            formDataCopy.endTime = formData.displayEndTime;
            formDataCopy.Birthdate = formData.displayBirthDate;

            console.log('Dados enviados para atualização:', formDataCopy);
            await UpdateEventOnServer(formDataCopy._id, formDataCopy);
            toast.success('Evento atualizado com sucesso!');
            closeModal();
            await fetchEvents();
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
                    left: 'prev,next today statistics',
                    center: 'title',
                    right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek customButton',
                }}
                customButtons={{
                    customButton: {
                        text: 'Agendar',
                        click: () => openAddModal(),
                    },
                    statistics: {
                        text: 'Estatísticas',
                        click: () => setShowStatisticsModal(true),
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
                handlegetUserEvents={GetUserEventsFromServer}
                error={error}
            />
            <UpdateEventModal
                showModal={showUpdateModal}
                closeModal={closeModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                handleDelete={handleDelete}
                handlegetUserEvents={GetUserEventsFromServer}
                error={error}
            />
            <StatisticsModal
                showModal={showStatisticsModal}
                closeModal={() => setShowStatisticsModal(false)}
                eventsData={eventsData}
            />

            <ToastContainer position="top-center" />
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
