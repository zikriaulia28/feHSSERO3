import React from "react";
import { Routes, Route } from "react-router-dom";
import PermitDriving from "./pages/permitDriving";
import Dashboard from "./pages/home";
import Cars from "./pages/cars";
import Login from "./pages/login"; // Halaman login
import Register from "./pages/userManagement"; // Halaman login
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import SafetyRecords from "./pages/SafetyRecords";
import UsaOrUsc from "./pages/usaOrUsc";
import PtwLog from "./pages/ptwLog";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Gunakan PrivateRoute untuk halaman yang membutuhkan login */}
      <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      <Route
        path="/permit-driving"
        element={<PrivateRoute element={<PermitDriving />} />}
      />
      <Route path="/ptwLog" element={<PrivateRoute element={<PtwLog />} />} />
      <Route
        path="/usaOrUsc"
        element={<PrivateRoute element={<UsaOrUsc />} />}
      />
      <Route
        path="/managementUsers"
        element={<PrivateRoute element={<Register />} />}
      />
      <Route
        path="/safeManHours"
        element={<PrivateRoute element={<SafetyRecords />} />}
      />
    </Routes>
  );
}

export default App;
