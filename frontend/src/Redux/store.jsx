import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
