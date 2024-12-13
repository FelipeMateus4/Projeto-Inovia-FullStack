import AppRoutes from './Routes/Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Importa o PersistGate
import store, { persistor } from './Redux/store'; // Importa o store e o persistor

function App() {
    return (
        <Provider store={store}>
            {/* PersistGate reidrata o estado persistido antes de renderizar o app */}
            <PersistGate loading={<div>Carregando...</div>} persistor={persistor}>
                <div className="App">
                    <AppRoutes />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
