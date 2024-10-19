import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import UserTable from "../components/UserTable";
import useUserData from "../hooks/useUserData";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk redirect
  const isRole = Cookies.get("role");
  const isAdmin = isRole === "admin";

  useEffect(() => {
    document.title = "User Management - HSSE TGI RO 3";

    // Redirect to home page if the user is not an admin
    if (!isAdmin) {
      navigate("/"); // Redirect to home page
    }
  }, [isAdmin, navigate]);

  const { userData, userError, mutate, registerUser, updateUser, deleteUser } =
    useUserData(); // Fetch user data

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State for editing user
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default value for role
  const [name, setName] = useState("");
  const [position, setPosition] = useState("Supervisor"); // Default value for position

  useEffect(() => {
    if (editingUser) {
      // Populate form fields with user data when editing
      setEmail(editingUser.email);
      setName(editingUser.name);
      setRole(editingUser.role);
      setPosition(editingUser.position);
      setPassword(""); // Password should not be displayed
    } else {
      // Clear form when adding a new user
      setEmail("");
      setName("");
      setRole("user");
      setPosition("Supervisor");
      setPassword("");
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when form is submitted
    const payload = { email, name, role, position };

    try {
      const success = editingUser
        ? await updateUser(editingUser.id, payload)
        : await registerUser({ email, password, name, role, position });

      if (success) {
        setIsFormVisible(false); // Sembunyikan form setelah sukses
        setEditingUser(null); // Reset state editing
        setEmail(""); // Clear the form
        setPassword(""); // Clear the form
        setName(""); // Clear the form
        setRole("user"); // Reset to default role
        setPosition("Supervisor"); // Reset to default position
        mutate(); // Refresh user data
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsFormVisible(true); // Show form when editing
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log("handle Delete User gagal", error);
    }
  };

  if (!isAdmin) {
    return null; // Jangan render apa pun jika bukan admin
  }

  return (
    <MainLayout titlePage="User Management" isLogedin={true}>
      <div className="justify-center items-center">
        {/* Tombol untuk menampilkan form register */}
        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)} // Tampilkan form ketika tombol diklik
            className="w-fit px-4 py-2 mb-4 text-white bg-green-500 rounded"
          >
            Add User
          </button>
        )}

        {/* Form register hanya muncul jika isFormVisible true */}
        {isFormVisible && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="mb-4 text-xl font-bold">
              {editingUser ? "Edit User" : "Register User"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-5 gap-4 ">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                {!editingUser && (
                  <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="position" className="block mb-2">
                    Position
                  </label>
                  <select
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="Supervisor">Supervisor</option>
                    <option value="FacilityTechnician">
                      Facility Technician
                    </option>
                    <option value="FacilitySupport">Facility Support</option>
                    <option value="Security">Security</option>
                    <option value="Driver">Driver</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormVisible(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 text-white bg-gray-500 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8l-4 4a8 8 0 01-4-4z"
                        ></path>
                      </svg>
                      {editingUser ? "Updating..." : "Registering..."}
                    </div>
                  ) : editingUser ? (
                    "Update"
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <h1 className="text-xl font-bold my-10">Data User</h1>
        {userError ? (
          <div className="text-red-500 font-bold">Error fetching user data</div>
        ) : !userData ? (
          <div>Loading...</div>
        ) : userData.length === 0 ? (
          <div className="text-gray-500">No user data available</div>
        ) : (
          <UserTable
            userData={userData}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            isAdmin={true} // You can conditionally pass this based on user role
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Register;
