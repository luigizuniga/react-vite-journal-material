import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // Estado inicial de la app // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null, // errores de retorno o default
    },
    reducers:{
        login: ( state, { payload }) => {
            state.status = 'authenticated'; // 'checking', 'not-authenticated', 'authenticated'
            state.uid  = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: ( state, { payload }) => {
            state.status = 'not-authenticated'; // 'checking', 'not-authenticated', 'authenticated'
            state.uid  = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking' // verifica el proceso de authenticated
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;