import React, { useState, useEffect } from "react";
// import useCarData from "../hooks/useCarData"; // Assuming you have a hook for fetching car data
import FormFindingUsaUsc from "../components/FormFindingUsaUsc"; // Assuming you have a form component for adding cars
import Modal from "../components/Modal";
import MainLayout from "../components/MainLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FindingTable from "../components/FindingTable";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

const UsaOrUsc = () => {
  useEffect(() => {
    document.title = "USA OR USC - HSSE TGI RO 3";
  }, []);
  // const { carData, carError, mutate } = useCarData(); // Fetch car data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // console.log("cek car : ", carData);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar function

  // if (carError) return <div className="text-red-500">Error loading data...</div>;
  // if (!carData) return <div className="text-center py-4">Loading...</div>;

  return (
    <MainLayout
      titlePage="Finding USA(Unsafe Action) And USC(Unsafe Codition)"
      isLogedin={true}
    >
      {/* Button to add new car */}
      <button
        onClick={handleOpenModal}
        className="w-fit flex items-center gap-2 bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
      >
        <h2>Add Finding</h2>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {/* <div className="overflow-x-auto">
        {carError ? (
          <div className="text-red-500 font-bold">Error fetching car data</div>
        ) : !carData ? (
          <div>Loading...</div>
        ) : carData.length === 0 ? (
          <div className="text-gray-500">
            Tidak ada data mobil yang tersedia
          </div>
        ) : (
          <CarTable carData={carData} />
        )}
      </div> */}

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <FormFindingUsaUsc onClose={handleCloseModal} />
        </Modal>
      )}
      <div className="overflow-x-auto">
        <FindingTable />
      </div>
    </MainLayout>
  );
};

export default UsaOrUsc;
