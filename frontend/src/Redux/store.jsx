import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa o localStorage como armazenamento padrão
import authReducer from './Slices/AuthSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
});

export const persistor = persistStore(store);
export default store;
