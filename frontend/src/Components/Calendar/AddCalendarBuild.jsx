import PropTypes from 'prop-types';

const AddEventModal = ({ showModal, closeModal, formData, handleChange, handleSubmit }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agendar Consulta</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Telefone:
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
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
    );
};
AddEventModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        nameNutri: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        Birthdate: PropTypes.string.isRequired,
        biotipoCorporal: PropTypes.string.isRequired,
        cpf: PropTypes.string.isRequired,
        recorrenceDays: PropTypes.number,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default AddEventModal;
