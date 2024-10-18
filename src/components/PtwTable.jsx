import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PtwTable = ({ ptwList, setEditData, mutate }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk modal konfirmasi hapus
  const [deleteId, setDeleteId] = useState(null); // State untuk menyimpan ID data yang akan dihapus

  // Fungsi untuk membuka modal konfirmasi hapus
  const openDeleteModal = (id) => {
    setDeleteId(id); // Simpan ID data yang akan dihapus
    setIsDeleteModalOpen(true); // Tampilkan modal
  };

  // Fungsi untuk menutup modal konfirmasi
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Tutup modal
    setDeleteId(null); // Reset ID
  };

  // Delete a PTW entry
  const deletePTW = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/ptw/${deleteId}`);
      mutate();
      toast.success("PTW berhasil dihapus");
      closeDeleteModal(); // Tutup modal setelah berhasil hapus
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus PTW");
    }
  };

  // Handle edit action
  const handleEdit = (data) => {
    setEditData(data); // Set data to be edited and open modal via prop
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No PTW
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Section
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type Of Work
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Receiving Authority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              HSSE Remark
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scan
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ptwList?.length === 0 ? (
            <tr>
              <td
                colSpan="10"
                className="px-4 py-2 text-center text-2xl text-gray-500"
              >
                Data Not Found
              </td>
            </tr>
          ) : (
            ptwList?.map((ptw, idx) => (
              <tr key={ptw.id} className="hover:bg-gray-100">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {idx + 1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ptw.noPTW}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.workDescription}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.section}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.typeOfWork}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.receivingAuthority}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.status}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.hsseRemark}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ptw.scan ? (
                    <a
                      href={ptw.scan}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faFilePdf} className="mr-2" /> PDF
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(ptw)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FontAwesomeIcon icon={faPen} /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(ptw.id)} // Open delete modal
                    className="text-red-600 hover:text-red-900"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal konfirmasi hapus */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Konfirmasi Hapus
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Apakah Anda yakin ingin menghapus PTW ini? Tindakan ini tidak
                  dapat dibatalkan.
                </p>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={deletePTW}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeDeleteModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PtwTable;
