import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // guardar o user logado
    isAuthenticated: false,
    token: null, // Para guardar os tokens jwt
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
        },
        clearAuthData: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
