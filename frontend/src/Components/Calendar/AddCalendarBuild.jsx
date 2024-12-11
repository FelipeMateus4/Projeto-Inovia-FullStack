import PropTypes from 'prop-types';

const AddEventModal = ({ showModal, closeModal, formData, handleChange, handleSubmit }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl p-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Agendar Sessão</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none text-xl"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Nutricionista:</label>
                        <input
                            type="text"
                            name="nameNutri"
                            value={formData.nameNutri}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Data:</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="Ex: 13/12/2024"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Hora Início:</label>
                        <input
                            type="text"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            placeholder="Ex: 10:13"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Hora Término:</label>
                        <input
                            type="text"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            placeholder="Ex: 21:20"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Nome do Paciente:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Telefone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Data de Nascimento:</label>
                        <input
                            type="text"
                            name="Birthdate"
                            value={formData.Birthdate}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Biotipo Corporal:</label>
                        <input
                            type="text"
                            name="biotipoCorporal"
                            value={formData.biotipoCorporal}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">CPF:</label>
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-gray-600 font-medium mb-1">Recorrência (em dias):</label>
                        <input
                            type="number"
                            name="recorrenceDays"
                            value={formData.recorrenceDays}
                            onChange={handleChange}
                            placeholder="Ex: 4"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Agendar
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
    formData: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default AddEventModal;
