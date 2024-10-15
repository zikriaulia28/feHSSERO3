import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormClosePermit = ({ permitId, kmAwal, onClose, mutate }) => {
  const [ifError, setIfError] = useState("")
  const [formData, setFormData] = useState({
    kmAkhir: '',
    jamMasuk: '',
    fuelLevel: '',
  });

  const [error, setError] = useState('');

  const fuelLevelOptions = ["E", "1/4", "1/2", "3/4", "F"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIfError(false)
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(''); // Reset error message

  //   // Validasi kmAkhir tidak boleh lebih kecil dari kmAwal
  //   if (Number(formData.kmAkhir) < Number(kmAwal)) {
  //     setError(`KM Akhir tidak boleh lebih kecil dari KM Keluar (${kmAwal})`);
  //     return; // Hentikan eksekusi jika validasi gagal
  //   }

  //   // Validasi jamMasuk tidak boleh kosong
  //   if (!formData.jamMasuk) {
  //     setError("Jam Masuk tidak boleh kosong.");
  //     return; // Hentikan eksekusi jika validasi gagal
  //   }

  //   try {
  //     // Step 1: Update status permit dan KM Akhir, Jam Masuk, Fuel Level
  //     await axios.put(`http://localhost:3001/permitDriving/${permitId}/status`, {
  //       kmAkhir: formData.kmAkhir,
  //       jamMasuk: formData.jamMasuk,
  //       fuelLevel: formData.fuelLevel,
  //       status: 'completed', // Status setelah permit ditutup
  //     });
  //     toast.success('Permit Behasil Di Tutup!', { position: 'top-right' }); // Toast sukses
  //     // Step 2: Call mutate untuk mendapatkan data terbaru
  //     await mutate();

  //     // Close the modal after successful submission
  //     onClose();
  //   } catch (error) {
  //     console.error('Error closing permit:', error);
  //     toast.error('Permit Gagal Di Tutup!', { position: 'top-right' });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validasi kmAkhir tidak boleh lebih kecil dari kmAwal
    if (Number(formData.kmAkhir) < Number(kmAwal)) {
      setError(`KM Akhir tidak boleh lebih kecil dari KM Keluar (${kmAwal})`);
      return; // Hentikan eksekusi jika validasi gagal
    }

    // Validasi jamMasuk tidak boleh kosong
    if (!formData.jamMasuk) {
      setError("Jam Masuk tidak boleh kosong.");
      return; // Hentikan eksekusi jika validasi gagal
    }

    try {
      // Step 1: Update status permit dan KM Akhir, Jam Masuk, Fuel Level
      await axios.put(`${process.env.REACT_APP_API_URL}/permitDriving/${permitId}/status`, {
        kmAkhir: formData.kmAkhir,
        jamMasuk: formData.jamMasuk,
        fuelLevel: formData.fuelLevel,
        status: 'completed', // Status setelah permit ditutup
      });
      toast.success('Permit Berhasil Ditutup!', { position: 'top-right' }); // Toast sukses

      // Step 2: Tambahkan log penggunaan ke usageLog
      await axios.post(`${process.env.REACT_APP_API_URL}/permitDriving/usageLog`, {
        permitId,
        kmUsed: Number(formData.kmAkhir) - Number(kmAwal), // Menghitung penggunaan KM
        jamMasuk: formData.jamMasuk,
        fuelLevel: formData.fuelLevel,
        date: new Date().toISOString(), // Atur tanggal ke sekarang
      });

      // Step 3: Call mutate untuk mendapatkan data terbaru
      await mutate();

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error closing permit:', error);
      toast.error('Permit Gagal Ditutup!', { position: 'top-right' });
      setIfError(true)
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full">
        <h2 className="text-lg font-bold text-center">Tutup Permit</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="kmAkhir" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="jamMasuk" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="fuelLevel" className="block text-sm font-medium text-gray-700">
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
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Batal
            </button>
            <button type="submit" className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${ifError ? "cursor-not-allowed" : ""}`}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormClosePermit;
