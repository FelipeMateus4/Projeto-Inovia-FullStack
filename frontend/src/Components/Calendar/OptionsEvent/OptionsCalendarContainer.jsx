import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

const UpdateEventModal = ({ showModal, closeModal, formData, handleChange, handleSubmit, handleDelete, error }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl p-6">
                {error && <div className="Error mb-10 flex justify-center">{error}</div>}
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
                        <InputMask
                            mask="99/99/9999"
                            name="displayDate"
                            value={formData.displayDate}
                            onChange={handleChange}
                            placeholder="Ex: 13/12/2024"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Hora Início:</label>
                        <InputMask
                            mask="99:99"
                            name="displayStartTime"
                            value={formData.displayStartTime}
                            onChange={handleChange}
                            placeholder="Ex: 10:13"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Hora Término:</label>
                        <InputMask
                            mask="99:99"
                            name="displayEndTime"
                            value={formData.displayEndTime}
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
                        <InputMask
                            mask="(99) 99999-9999"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ex: (36) 12345-6789"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Data de Nascimento:</label>
                        <InputMask
                            mask="99/99/9999"
                            name="displayBirthDate"
                            value={formData.displayBirthDate}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">Biotipo Corporal:</label>
                        <select
                            name="biotipoCorporal"
                            value={formData.biotipoCorporal}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="" disabled>
                                Selecione...
                            </option>
                            <option value="Endomorfo">Endomorfo</option>
                            <option value="Ectomorfo">Ectomorfo</option>
                            <option value="Mesomorfo">Mesomorfo</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium mb-1">CPF:</label>
                        <InputMask
                            mask="999.999.999-99"
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
                    <div className="col-span-2 flex justify-between gap-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none "
                            id=" justify-end"
                        >
                            Deletar
                        </button>
                        <div className="flex gap-4">
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
                                Editar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

UpdateEventModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    error: PropTypes.any,
};

export default UpdateEventModal;
