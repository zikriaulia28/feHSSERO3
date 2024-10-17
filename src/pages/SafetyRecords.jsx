import React, { useState, useEffect } from "react";
import useSafetyRecords from "../hooks/useSafetyRecords";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SafetyRecordTable from "../components/SafetyRecordTable";
import FormSafetyRecord from "../components/FormSafetyRecord";
import Modal from "../components/Modal";
import MainLayout from "../components/MainLayout";

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
  );
};

export default SafetyRecords;
