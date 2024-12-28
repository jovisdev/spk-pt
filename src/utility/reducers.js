import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    jabatan: null, // Role default null
    nama: null,
    token: null
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.nama = action.payload.nama;
      state.token = action.payload.token;
      state.jabatan = action.payload.jabatan; // Simpan role setelah login
    },
    logout: (state) => {
      state.id = null;
      state.nama = null;
      state.token = null;
      state.jabatan = null;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;