import PropTypes from 'prop-types';
import Statistics from './Statics';

const StatisticsModal = ({ showModal, closeModal, eventsData }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6"
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Estatísticas de Consultas</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none text-xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <Statistics eventsData={eventsData} />
                </div>
            </div>
        </div>
    );
};

StatisticsModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    eventsData: PropTypes.array.isRequired,
};

export default StatisticsModal;
