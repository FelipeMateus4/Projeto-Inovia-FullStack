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
    const [showModal, setShowModal] = useState(false);
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
                    // Extrai data (ano, mes, dia) da `date`
                    const mainDate = new Date(evt.date);
                    const year = mainDate.getFullYear();
                    const month = String(mainDate.getMonth() + 1).padStart(2, '0');
                    const day = String(mainDate.getDate()).padStart(2, '0');

                    // Extrai horas e minutos de startTime
                    const startDate = new Date(evt.startTime);
                    const startHours = String(startDate.getHours()).padStart(2, '0');
                    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');

                    // Extrai horas e minutos de endTime
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

    const HandleSetData = (viewInfo) => {
        setIsYearView(viewInfo.view.type === 'dayGridYear');
    };

    const openModal = () => {
        setShowModal(true);
    };

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
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            nameNutri,
            date,
            startTime,
            endTime,
            name,
            email,
            phone,
            Birthdate,
            biotipoCorporal,
            cpf,
            recorrenceDays,
        } = formData;

        const body = {
            nameNutri,
            date,
            startTime,
            endTime,
            name,
            email,
            phone,
            Birthdate,
            biotipoCorporal,
            cpf,
        };

        if (recorrenceDays.trim() !== '') {
            body.recorrenceDays = Number(recorrenceDays);
        }

        try {
            const response = await fetch('http://localhost:3000/consultas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const newEvent = await response.json();

                // Converter o novo evento
                const mainDate = new Date(newEvent.date);
                const year = mainDate.getFullYear();
                const month = String(mainDate.getMonth() + 1).padStart(2, '0');
                const day = String(mainDate.getDate()).padStart(2, '0');

                const startDate = new Date(newEvent.startTime);
                const startHours = String(startDate.getHours()).padStart(2, '0');
                const startMinutes = String(startDate.getMinutes()).padStart(2, '0');

                const endDate = new Date(newEvent.endTime);
                const endHours = String(endDate.getHours()).padStart(2, '0');
                const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

                const start = `${year}-${month}-${day}T${startHours}:${startMinutes}`;
                const end = `${year}-${month}-${day}T${endHours}:${endMinutes}`;

                const eventObj = {
                    title: `${newEvent.nameNutri} - ${newEvent.name}`,
                    start,
                    end,
                    extendedProps: { ...newEvent },
                };

                // Atualiza o estado para exibir o novo evento no calendário
                setEventsData((prev) => [...prev, eventObj]);

                closeModal();
            } else {
                console.error('Erro ao criar a consulta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
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
                datesSet={HandleSetData}
            />

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Agendar Consulta</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {/* Campos do formulário */}
                            <label>
                                Nutricionista:
                                <input
                                    type="text"
                                    name="nameNutri"
                                    value={formData.nameNutri}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Data (DD/MM/YYYY):
                                <input
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    placeholder="Ex: 13/12/2024"
                                    required
                                />
                            </label>
                            <label>
                                Hora Início (HH:MM):
                                <input
                                    type="text"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    placeholder="Ex: 10:13"
                                    required
                                />
                            </label>
                            <label>
                                Hora Término (HH:MM):
                                <input
                                    type="text"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    placeholder="Ex: 21:20"
                                    required
                                />
                            </label>
                            <label>
                                Nome do Paciente:
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Telefone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Data de Nascimento (DD/MM/YYYY):
                                <input
                                    type="text"
                                    name="Birthdate"
                                    value={formData.Birthdate}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Biotipo Corporal:
                                <input
                                    type="text"
                                    name="biotipoCorporal"
                                    value={formData.biotipoCorporal}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                CPF:
                                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
                            </label>
                            <label>
                                Recorrência (em dias) - Opcional:
                                <input
                                    type="number"
                                    name="recorrenceDays"
                                    value={formData.recorrenceDays}
                                    onChange={handleChange}
                                    placeholder="Ex: 4"
                                />
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit">Agendar</button>
                                <button type="button" onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
