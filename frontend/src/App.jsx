import AppRoutes from './Routes/Routes';
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <AppRoutes />
            </div>
        </Provider>
    );
}

export default App;
