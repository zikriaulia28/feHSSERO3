import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormPtw = ({ isEdit, initialData, onClose, mutate }) => {
  const [formData, setFormData] = useState({
    date: "",
    noPTW: "",
    workDescription: "",
    section: "",
    typeOfWork: "",
    receivingAuthority: "",
    status: "",
    hsseRemark: "",
    scan: null,
  });

  // UseEffect to populate form if editing
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? initialData.date.split("T")[0] : "", // Handle date format
        scan: null, // Don't prepopulate the file input, let user upload a new file if needed
      });
    }
  }, [isEdit, initialData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, scan: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Loop through the formData object to append each field to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (isEdit) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/ptw/${initialData.id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Make sure to include multipart/form-data for file uploads
            },
          }
        );
        toast.success("PTW berhasil diperbarui!");
      } else {
        // POST request for new PTW
        await axios.post(`${process.env.REACT_APP_API_URL}/ptw`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to include multipart/form-data for file uploads
          },
        });
        // mutate(); // Refresh data after submit
        toast.success("PTW berhasil dibuat!");
      }
      onClose(); // Close modal
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 p-6 bg-white rounded-lg"
    >
      {/* Date Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Tanggal
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* No PTW Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          No PTW
        </label>
        <input
          type="text"
          name="noPTW"
          value={formData.noPTW}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Work Description Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Deskripsi Pekerjaan
        </label>
        <input
          type="text"
          name="workDescription"
          value={formData.workDescription}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Section Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Bagian/Departemen
        </label>
        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Type of Work Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Jenis Pekerjaan
        </label>
        <input
          type="text"
          name="typeOfWork"
          value={formData.typeOfWork}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Receiving Authority Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Penerima Tanggung Jawab
        </label>
        <input
          type="text"
          name="receivingAuthority"
          value={formData.receivingAuthority}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Status Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* HSSE Remark Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          HSSE Remark
        </label>
        <input
          type="text"
          name="hsseRemark"
          value={formData.hsseRemark}
          onChange={handleInputChange}
          className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* File Upload for Scan */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Scan Dokumen (Upload Baru jika ingin mengganti)
        </label>
        <input
          type="file"
          name="scan"
          onChange={handleFileChange}
          className="mt-1  block w-full text-sm text-gray-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isEdit ? "Update" : "Kirim"}
      </button>
    </form>
  );
};

export default FormPtw;
