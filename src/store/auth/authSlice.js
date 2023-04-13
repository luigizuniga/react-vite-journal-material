import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // Estado inicial de la app
        uid: null,
        email: null,
        displayname: null,
        photoURL: null,
        errorMessenge: null, // errores de retorno o default
    },
    reducers:{
        login: ( state, { payload }) => {
            state.status = 'authenticated';
            state.uid  = payload.uid;
            state.email = payload.email;
            state.displayname = payload.displayname;
            state.photoURL = payload.photoURL;
            state.errorMessenge = null;
        },
        logout: ( state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid  = payload.uid;
            state.email = payload.email;
            state.displayname = payload.displayname;
            state.photoURL = payload.photoURL;
            state.errorMessenge = payload?.errorMessenge;
        },
        checkingCredentials: (state) => {
            state.status = 'checking' // verifica el proceso de authenticated
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;