import React, { useState, useEffect } from "react";
import useSafetyRecords from "../hooks/useSafetyRecords";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SafetyRecordTable from "../components/SafetyRecordTable";
import FormSafetyRecord from "../components/FormSafetyRecord";
import Modal from "../components/Modal";
// import Navbar from "../components/Navbar";
import MainLayout from "../components/MainLayout";
// import Sidebar from '../components/Sidebar';

const SafetyRecords = () => {
  useEffect(() => {
    document.title = "Safe Man Hours - HSSE TGI RO 3";
  }, []);
  const {
    safetyRecords = [],
    error,
    loading,
    deleteSafetyRecord,
  } = useSafetyRecords();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle buka dan tutup modal untuk tambah/edit safety record
  const handleOpenModal = (record = null) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <MainLayout titlePage="Data Safety Record" isLogedin={true}>
      <button
        onClick={() => handleOpenModal(null)}
        className="w-fit flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded my-4"
      >
        <h2 className="font-bold">Tambah Safety Record</h2>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {/* Tabel Data Rekaman Safety */}
      <div className="overflow-x-auto max-w-screen-xl">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <SafetyRecordTable
            records={[]}
            onEdit={handleOpenModal}
            onDelete={deleteSafetyRecord}
          />
        ) : (
          <SafetyRecordTable
            records={safetyRecords}
            onEdit={handleOpenModal}
            onDelete={deleteSafetyRecord}
          />
        )}
      </div>

      {/* Modal untuk Tambah/Edit Safety Record */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <FormSafetyRecord
            initialData={selectedRecord}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </MainLayout>
    // <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    //   <Navbar toggleSidebar={toggleSidebar} />
    //   <div className="flex flex-grow">
    //     {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
    //     <div className="m-4 p-6 border rounded-xl bg-white shadow-md flex-grow">
    //       <h1 className="text-2xl font-semibold mb-4">Data Rekaman Safety</h1>
    //       {/* Button untuk membuka modal Tambah Record */}
    //       <button
    //         onClick={() => handleOpenModal(null)}
    //         className="bg-green-500 text-white p-2 rounded my-4"
    //       >
    //         Tambah Rekaman Safety
    //       </button>
    //       {/* Modal untuk Tambah/Edit Safety Record */}
    //       {isModalOpen && (
    //         <Modal onClose={handleCloseModal}>
    //           <FormSafetyRecord
    //             initialData={selectedRecord}
    //             onClose={handleCloseModal}
    //           />
    //         </Modal>
    //       )}

    //       {/* Tabel Data Rekaman Safety */}
    //       <div className="overflow-x-auto max-w-screen-xl">
    //         {loading ? (
    //           <div>Loading...</div>
    //         ) : error ? (
    //           <SafetyRecordTable
    //             records={[]}
    //             onEdit={handleOpenModal}
    //             onDelete={deleteSafetyRecord}
    //           />
    //         ) : (
    //           <SafetyRecordTable
    //             records={safetyRecords}
    //             onEdit={handleOpenModal}
    //             onDelete={deleteSafetyRecord}
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SafetyRecords;
