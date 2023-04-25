
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { journalSlice } from "./journalSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        // auth: journalSlice.reducer
    }
})