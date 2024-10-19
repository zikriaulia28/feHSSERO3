import useSWR from "swr";
import { fetcher } from "../services/api"; // Pastikan fetcher diimpor dari layanan API yang Anda gunakan
import { toast } from "react-toastify"; // Pastikan toast diimpor

const useUserData = () => {
  const {
    data: userData,
    error: userError,
    mutate,
  } = useSWR(`${process.env.REACT_APP_API_URL}/users`, fetcher);

  // Fungsi untuk registrasi pengguna baru
  const registerUser = async ({ email, password, name, role, position }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, role, position }),
        }
      );

      if (response.ok) {
        toast.success("User created successfully!", { position: "top-right" });
        mutate(); // Refresh user data after registration
        return true; // Indikasi bahwa registrasi berhasil
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error creating user", {
          position: "top-right",
        });
        return false; // Indikasi bahwa registrasi gagal
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration", {
        position: "top-right",
      });
      return false;
    }
  };

  // Fungsi untuk mengupdate data pengguna
  const updateUser = async (userId, { email, name, role, position }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          method: "PATCH", // PATCH untuk mengupdate data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, role, position }),
        }
      );

      if (response.ok) {
        toast.success("User updated successfully!", { position: "top-right" });
        mutate(); // Refresh user data after update
        return true; // Indikasi bahwa update berhasil
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error updating user", {
          position: "top-right",
        });
        return false; // Indikasi bahwa update gagal
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during the update process", {
        position: "top-right",
      });
      return false;
    }
  };

  // Fungsi untuk menghapus pengguna
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        {
          method: "DELETE", // DELETE untuk menghapus pengguna
        }
      );

      if (response.ok) {
        toast.success("oi User deleted successfully!", {
          position: "top-right",
        });
        mutate(); // Refresh user data after deletion
        return true; // Indikasi bahwa penghapusan berhasil
      } else {
        toast.error("Failed to delete user", { position: "top-right" });
        return false; // Indikasi bahwa penghapusan gagal
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during the deletion process", {
        position: "top-right",
      });
      return false;
    }
  };

  return { userData, userError, mutate, registerUser, updateUser, deleteUser };
};

export default useUserData;
