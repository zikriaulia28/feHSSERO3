import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormPermitDriving = ({ onClose, mutate, availableCars, permitData }) => {
  const [formData, setFormData] = useState({
    date: "",
    namaPengemudi: "",
    carId: "",
    tujuan: "",
    barangBawaan: "",
    pemohon: "",
    pemberiIzin: "",
    petugasSecurity: "",
    kmAwal: "",
    status: "waiting",
    jamKeluar: "",
    fuelLevel: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading

  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Cek jika carId berubah, ambil kmAkhir dari permit terakhir mobil tersebut
    if (formData.carId) {
      const permitForSelectedCar = permitData
        .filter((permit) => permit.carId === parseInt(formData.carId)) // filter permit berdasarkan carId
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // urutkan permit berdasarkan tanggal

      // Jika ada permit sebelumnya untuk mobil yang dipilih, gunakan kmAkhir dari permit terakhir
      if (permitForSelectedCar.length > 0) {
        const lastPermit = permitForSelectedCar[0]; // permit terakhir untuk mobil
        setFormData((prevData) => ({
          ...prevData,
          kmAwal: lastPermit.kmAkhir || "", // isi kmAwal dengan kmAkhir permit terakhir
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          kmAwal: "", // kosongkan jika tidak ada permit sebelumnya
        }));
      }
    }
  }, [formData.carId, permitData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state ke true saat tombol submit diklik
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/permitDriving`,
        formData
      );
      mutate();
      onClose(); // Close modal after submitting
      toast.success("Permit Kendaraan berhasil dibuat!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error adding data:", error);
      toast.error("Gagal membuat Permit Kendaraan. Silakan coba lagi.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false); // Set loading state ke false setelah request selesai
    }
  };

  const pemberiIzinOptions = [
    "Yudi Yandri",
    "Deden Darwin",
    "Junaidi",
    "Indra Wijaya",
    "Rudi Indra",
  ];
  const fuelLevelOptions = ["E", "1/4", "1/2", "3/4", "F"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center text-xl font-bold">
        Izin Penggunaan Kendaraan
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="namaPengemudi"
          placeholder="Nama Pengemudi"
          value={formData.namaPengemudi}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="carId"
          value={formData.carId}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Pilih Mobil</option>
          {availableCars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.model} - {car.nopol}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="tujuan"
          placeholder="Keperluan/Tujuan"
          value={formData.tujuan}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="barangBawaan"
          placeholder="Barang Bawaan"
          value={formData.barangBawaan}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="pemohon"
          placeholder="Pemohon"
          value={formData.pemohon}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="pemberiIzin"
          value={formData.pemberiIzin}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Pilih Approval</option>
          {pemberiIzinOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="petugasSecurity"
          placeholder="Petugas Security"
          value={formData.petugasSecurity}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="kmAwal"
          placeholder="KM Awal"
          value={formData.kmAwal}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="fuelLevel"
          value={formData.fuelLevel}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Fuel Level</option>
          {fuelLevelOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="time"
          name="jamKeluar"
          value={formData.jamKeluar}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-200"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          disabled={isLoading} // Disable button when loading
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
              Loading...
            </div>
          ) : (
            "Kirim"
          )}
        </button>
      </div>
    </form>
  );
};

export default FormPermitDriving;
