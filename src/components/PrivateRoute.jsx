import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Menggunakan js-cookie untuk mengakses token dari cookies

const PrivateRoute = ({ element }) => {
  const token = Cookies.get('token'); // Mengambil token dari cookies

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika ada token, render komponen yang diminta
  return element;
};

export default PrivateRoute;
