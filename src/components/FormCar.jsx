import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormCar = ({ onClose, mutate }) => {
  const [formData, setFormData] = useState({
    nopol: '',
    model: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/cars`, formData);
      console.log('Response:', response);
      toast.success('Mobil berhasil ditambahkan!', {
        position: 'top-right', // Gunakan string untuk posisi
      });
      mutate(); // Memperbarui data mobil
      onClose(); // Menutup modal setelah mengirim
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Gagal menambahkan mobil. Silakan coba lagi.', {
        position: 'top-right', // Gunakan string untuk posisi
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-fit space-y-6 p-6 bg-white rounded-lg">
      <div className='text-center text-2xl font-bold text-blue-600'>Tambah Data Mobil</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nopol" className="block text-gray-700 font-semibold">Nomor Polisi</label>
          <input
            type="text"
            id="nopol"
            name="nopol"
            placeholder="Masukkan Nomor Polisi"
            value={formData.nopol}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-gray-700 font-semibold">Model Mobil</label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Masukkan Model Mobil"
            value={formData.model}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg transition duration-200"
        >
          Batal
        </button>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Menambahkan...' : 'Tambah Mobil'}
        </button>
      </div>
    </form>
  );
};

export default FormCar;
