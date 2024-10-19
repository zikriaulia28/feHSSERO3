import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormClosePermit = ({ permitId, kmAwal, onClose, mutate }) => {
  const [formData, setFormData] = useState({
    kmAkhir: "",
    jamMasuk: "",
    fuelLevel: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading

  const fuelLevelOptions = ["E", "1/4", "1/2", "3/4", "F"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Validasi kmAkhir tidak boleh lebih kecil dari kmAwal
    if (Number(formData.kmAkhir) < Number(kmAwal)) {
      setError(`KM Akhir tidak boleh lebih kecil dari KM Keluar (${kmAwal})`);
      return;
    }

    // Validasi jamMasuk tidak boleh kosong
    if (!formData.jamMasuk) {
      setError("Jam Masuk tidak boleh kosong.");
      return;
    }

    setIsLoading(true); // Set loading state ke true ketika form disubmit

    try {
      // Step 1: Update status permit dan KM Akhir, Jam Masuk, Fuel Level
      await axios.put(
        `${process.env.REACT_APP_API_URL}/permitDriving/${permitId}/status`,
        {
          kmAkhir: formData.kmAkhir,
          jamMasuk: formData.jamMasuk,
          fuelLevel: formData.fuelLevel,
          status: "completed",
        }
      );
      toast.success("Permit Berhasil Ditutup!", { position: "top-right" });

      // Step 2: Tambahkan log penggunaan ke usageLog
      await axios.post(
        `${process.env.REACT_APP_API_URL}/permitDriving/usageLog`,
        {
          permitId,
          kmUsed: Number(formData.kmAkhir) - Number(kmAwal),
          jamMasuk: formData.jamMasuk,
          fuelLevel: formData.fuelLevel,
          date: new Date().toISOString(),
        }
      );

      await mutate(); // Refresh data setelah submit
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error closing permit:", error);
      toast.error("Permit Gagal Ditutup!", { position: "top-right" });
      setError(true);
    } finally {
      setIsLoading(false); // Set loading state ke false setelah proses selesai
    }
  };

  return (
    <div className="p-6 rounded">
      <h2 className="text-lg font-bold text-center mb-6">Tutup Permit</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="kmAwal"
            className="block text-sm font-medium text-gray-700"
          >
            KM Awal:
          </label>
          <input
            value={kmAwal}
            className="border border-gray-300 rounded p-2 w-full"
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="kmAkhir"
            className="block text-sm font-medium text-gray-700"
          >
            KM Akhir:
          </label>
          <input
            type="number"
            id="kmAkhir"
            name="kmAkhir"
            value={formData.kmAkhir}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="jamMasuk"
            className="block text-sm font-medium text-gray-700"
          >
            Jam Masuk:
          </label>
          <input
            type="time"
            id="jamMasuk"
            name="jamMasuk"
            value={formData.jamMasuk}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fuelLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Level Bahan Bakar:
          </label>
          <select
            id="fuelLevel"
            name="fuelLevel"
            value={formData.fuelLevel}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Pilih Level Bahan Bakar</option>
            {fuelLevelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading} // Disabled saat loading
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
              "Simpan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormClosePermit;
