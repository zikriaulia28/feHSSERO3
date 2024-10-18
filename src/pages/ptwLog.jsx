import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import FormPtw from "../components/FormPtw";
import Modal from "../components/Modal";
import MainLayout from "../components/MainLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PtwTable from "../components/PtwTable";

// Fetcher function for SWR
const fetcher = (url) => axios.get(url).then((res) => res.data);

const PtwLog = () => {
  useEffect(() => {
    document.title = "Permit To Work Log - HSSE TGI RO 3";
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null); // State for data to be edited

  // Fetch PTW data using SWR
  const { data: ptwList, mutate } = useSWR(
    `${process.env.REACT_APP_API_URL}/ptw`,
    fetcher
  );

  // Function to open modal for adding or editing
  const handleOpenModal = (data = null) => {
    setInitialData(data); // Set data if editing, otherwise null
    setIsModalOpen(true); // Open modal
  };

  // Function to close modal and reset initial data
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInitialData(null); // Reset data after modal is closed
  };

  return (
    <MainLayout titlePage="Permit To Work Log" isLogedin={true}>
      {/* Button to add new PTW */}
      <button
        onClick={() => handleOpenModal()} // Open modal for adding new PTW
        className="w-fit flex items-center gap-2 bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
      >
        <h2>Add PTW</h2>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {/* Modal for adding or editing PTW */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <FormPtw
            onClose={handleCloseModal}
            isEdit={!!initialData} // If there is data, it's edit mode
            initialData={initialData} // Pass initial data for edit
            mutate={mutate} // Pass mutate function to refresh data after submit
          />
        </Modal>
      )}

      {/* PTW Table */}
      <div className="overflow-x-auto">
        <PtwTable ptwList={ptwList} setEditData={handleOpenModal} />{" "}
        {/* Pass ptwList and handleOpenModal to table */}
      </div>
    </MainLayout>
  );
};

export default PtwLog;
