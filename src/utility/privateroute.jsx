import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRole }) => {
  const role =  useSelector((state) => state.jabatan)// Ambil role dari localStorage

  if (!role) {
    // Jika role tidak ditemukan, redirect ke halaman login
    return <Navigate to="/unauthorized" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Jika role tidak sesuai dengan yang dibutuhkan, redirect ke halaman login
    return <Navigate to="/unauthorized" />;
  }

  // Jika role sesuai, tampilkan halaman yang diminta
  return children;
};

export default PrivateRoute;