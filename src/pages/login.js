// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Login = () => {
  useEffect(() => {
    document.title = 'Login - HSSE TGI RO 3';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token); // Simpan token di cookies
        Cookies.set('name', data.user.name); // Simpan token di cookies
        Cookies.set('role', data.user.role); // Simpan token di cookies

        toast.success('Login berhasil!', { position: 'top-right' });
        navigate('/'); // Arahkan ke halaman utama setelah login
      } else {
        const errorData = await response.json();
        toast.error(errorData.error, { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan saat login', { position: 'top-right' });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-cover bg-center from-blue-400 to-blue-600" style={{
      backgroundImage: "url('https://hsse-tgi-ro3.vercel.app/images/hero-03.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* <img src={logo} alt="Logo" className="mb-4 w-24 mx-auto" /> */}
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Selamat Datang!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-200">
            Login
          </button>
        </form>
        {/* <p className="mt-4 text-center text-gray-600">
          Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar di sini</a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
