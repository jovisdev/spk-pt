import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRole }) => {
  const role = useSelector((state) => state.jabatan); // Ambil role dari Redux

  if (!role) {
    // Jika role tidak ditemukan, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    // Jika role tidak termasuk dalam daftar role yang diizinkan
    return <Navigate to="/unauthorized" />;
  }

  // Jika role sesuai, tampilkan halaman yang diminta
  return children;
};

export default PrivateRoute;


// export const PrivateRoute = ({ requiredRole, children }) => {
//   const userRole = getUserRole(); // Retrieve user role (e.g., from context or state)
//   if (!requiredRole.includes(userRole)) {
//     return <Navigate to="/unauthorized" />; // Redirect if not authorized
//   }
//   return children;
// };
