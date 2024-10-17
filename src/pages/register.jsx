// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, role }),
        }
      );

      if (response.ok) {
        // alert("User registered successfully");
        // history.push("/login"); // Arahkan ke halaman login setelah registrasi
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Tampilkan pesan kesalahan
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <MainLayout titlePage="Management Users" isLogedin={true}></MainLayout>
    // <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //   <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
    //     <h2 className="mb-4 text-xl font-bold">Register</h2>
    //     <div className="mb-4">
    //       <label htmlFor="email" className="block mb-2">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full px-3 py-2 border rounded"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password" className="block mb-2">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full px-3 py-2 border rounded"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="role" className="block mb-2">
    //         Name
    //       </label>
    //       <select
    //         id="role"
    //         value={role}
    //         onChange={(e) => setRole(e.target.value)}
    //         className="w-full px-3 py-2 border rounded"
    //       >
    //         <option value="USER">User</option>
    //         <option value="ADMIN">Admin</option>
    //       </select>
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="role" className="block mb-2">
    //         Role
    //       </label>
    //       <select
    //         id="role"
    //         value={role}
    //         onChange={(e) => setRole(e.target.value)}
    //         className="w-full px-3 py-2 border rounded"
    //       >
    //         <option value="USER">User</option>
    //         <option value="ADMIN">Admin</option>
    //       </select>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full px-4 py-2 text-white bg-blue-500 rounded"
    //     >
    //       Register
    //     </button>
    //   </form>
    // </div>
  );
};

export default Register;
