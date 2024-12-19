import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jabatan: null, // Role default null
    nama: null,
    token: null
  },
  reducers: {
    login: (state, action) => {
      state.nama = action.payload.name;
      state.token = action.payload.token;
      state.jabatan = action.payload.jabatan; // Simpan role setelah login
    },
    logout: (state) => {
      state.name = null;
      state.token = null;
      state.jabatan = null;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;