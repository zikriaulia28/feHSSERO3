import React, { useState, useEffect } from "react";
import axios from "axios";
import FormFindingUsaUsc from "./FormFindingUsaUsc"; // Import the form component

const FindingTable = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/usaTemuan`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/usaTemuan/${id}`);
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  // Handle edit action
  const handleEdit = (temuan) => {
    setEditData(temuan);
    setIsEditing(true); // Set edit mode
  };

  // Close the form after editing or cancelling
  const handleClose = () => {
    setIsEditing(false);
    setEditData(null);
    fetchData(); // Refresh data after edit
  };

  return (
    <>
      {isEditing ? (
        <FormFindingUsaUsc
          onClose={handleClose}
          mutate={fetchData}
          isEdit={true}
          initialData={editData}
        />
      ) : (
        <>
          <table className="table-auto w-full ">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Lokasi Temuan</th>
                <th className="px-4 py-2">Area Spesifik</th>
                <th className="px-4 py-2">Jenis Temuan</th>
                <th className="px-4 py-2">USC Condition</th>
                <th className="px-4 py-2">USA Practice</th>
                <th className="px-4 py-2">Penyebab Ketidak sesuaian</th>
                <th className="px-4 py-2">Tindakan Perbaikan</th>
                <th className="px-4 py-2">Tindakan Pencegahan</th>
                <th className="px-4 py-2">Foto Sebelum</th>
                <th className="px-4 py-2">Foto Closing</th>
                <th className="px-4 py-2">Waktu</th>
                <th className="px-4 py-2">Status Akhir</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr className="border text-2xl bg-gray-100">
                  <td colSpan="17" className="text-center  px-4 py-2">
                    Data Not Found
                  </td>
                </tr>
              ) : (
                data.map((temuan, idx) => (
                  <tr key={temuan.id} className="text-balance">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{temuan.nama}</td>
                    <td className="px-4 py-2">{temuan.status}</td>
                    <td className="px-4 py-2">{temuan.judul}</td>
                    <td className="px-4 py-2">{temuan.lokasiTemuan}</td>
                    <td className="px-4 py-2">{temuan.areaSpesifik}</td>
                    <td className="px-4 py-2">{temuan.jenisTemuan}</td>
                    <td className="px-4 py-2">{temuan.uscConditionTerkait}</td>
                    <td className="px-4 py-2">{temuan.usaPracticeTerkait}</td>
                    <td className="px-4 py-2">
                      {temuan.penyebabKetidaksesuaian}
                    </td>
                    <td className="px-4 py-2">{temuan.tindakanPerbaikan}</td>
                    <td className="px-4 py-2">{temuan.tindakanPencegahan}</td>
                    <td className="px-4 py-2">
                      <img
                        src={temuan.fotoSebelum}
                        alt="Foto Sebelum"
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={temuan.fotoClosing ? temuan.fotoClosing : ""}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {new Date(temuan.waktu).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{temuan.statusAkhir}</td>
                    <td className="py-10 flex">
                      <button
                        onClick={() => handleEdit(temuan)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(temuan.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default FindingTable;
