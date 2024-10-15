import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormPermitDriving = ({ onClose, mutate }) => {
  const [formData, setFormData] = useState({
    date: '',
    namaPengemudi: '',
    carId: '',
    tujuan: '',
    barangBawaan: '',
    pemohon: '',
    pemberiIzin: '',
    petugasSecurity: '',
    kmAwal: '',
    status: 'waiting',
    jamKeluar: '',
    fuelLevel: '',
  });

  console.log(formData)

  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch available cars
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

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
      await axios.post(`${process.env.REACT_APP_API_URL}/permitDriving`, formData);
      mutate();
      onClose(); // Close modal after submitting
      toast.success('Permit Kendaraan berhasil dibuat!', {
        position: 'top-right', // Gunakan string untuk posisi
      });
    } catch (error) {
      console.error('Error adding data:', error);
      toast.error('Gagal membuat Permit Kendaraan. Silakan coba lagi.', {
        position: 'top-right', // Gunakan string untuk posisi
      });
    }
  };

  const pemberiIzinOptions = ["Yudi Yandri", "Deden Darwin", "Junaidi", "Indra Wijaya", "Rudi Indra"];
  const fuelLevelOptions = ["E", "1/4", "1/2", "3/4", "F"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='text-center text-xl font-bold'>Izin Penggunaan Kendaraan</div>
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
          {cars.map((car) => (
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
            <option key={index} value={option}>{option}</option>
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
            <option key={index} value={option}>{option}</option>
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
        >
          Kirim
        </button>
      </div>
    </form>
  );
};

export default FormPermitDriving;