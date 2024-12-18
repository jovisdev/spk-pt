import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    statusJabatan: "guest", // Default role: "guest"
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.statusJabatan = action.payload.jabatan; // Contoh payload: { role: "admin" }
            state.namaUser = action.payload.name
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.statusJabatan = "guest";
            state.namaUser = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
