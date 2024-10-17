// src/pages/PermitDriving.js
import React, { useState, useEffect } from "react";
import usePermitData from "../hooks/usePermitData";
import PermitTable from "../components/PermitTable";
import useCarData from "../hooks/useCarData"; // Assuming you have a hook for fetching car data
import CarTable from "../components/CarsTable";
import FormCar from "../components/FormCar"; // Assuming you have a form component for adding cars
import Cookies from "js-cookie";
import MainLayout from "../components/MainLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/Modal";

const PermitDriving = () => {
  useEffect(() => {
    document.title = "Permit Driving - HSSE TGI RO 3";
  }, []);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  // const [selectedPermitId, setSelectedPermitId] = useState(null);
  const { permitData, permitError, handleUpdateStatus } = usePermitData();
  const { carData, carError, mutate } = useCarData(); // Fetch car data
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle buka dan tutup modal Buat Permit
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const role = Cookies.get("role");
  const isAdmin = role === "admin";

  return (
    <MainLayout titlePage="Data Penggunaan Kendaraan" isLogedin={true}>
      {/* Tabel Data Permit */}
      <div className="overflow-x-scroll">
        {permitError ? (
          <PermitTable
            permitData={permitData}
            handleUpdateStatus={handleUpdateStatus}
            isAdmin={isAdmin}
          />
        ) : !permitData ? (
          <div>Loading...</div>
        ) : permitData.length === 0 ? (
          <div>No permit data available</div>
        ) : (
          <PermitTable
            permitData={permitData}
            handleUpdateStatus={handleUpdateStatus}
            isAdmin={isAdmin}
          />
        )}
      </div>

      {/* Button to add new car */}
      <button
        onClick={handleOpenModal}
        className="mt-10 w-fit flex items-center gap-2 bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
      >
        <h2>Add Data Cars</h2>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <div className="overflow-x-auto">
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal} isFormCar={true}>
          <FormCar onClose={handleCloseModal} mutate={mutate} />
        </Modal>
      )}
    </MainLayout>
    // <div className="flex flex-col bg-gray-50 text-gray-800">
    //   <Navbar toggleSidebar={toggleSidebar} />
    //   <Wrapper>
    //     <div className="min-h-screen flex overflow-hidden">
    //       {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
    //       <div className="w-full m-4 p-6 border rounded-xl bg-white shadow-md flex-grow">
    //         <h1 className="text-2xl font-semibold mb-4">Data Penggunaan Kendaraan</h1>
    //         <div>
    //           {/* Modal untuk Membuat Permit */}
    //           {isModalOpen && (
    //             <Modal onClose={handleCloseModal}>
    //               <FormPermitDriving onClose={handleCloseModal} mutate={mutate} />
    //             </Modal>
    //           )}

    //           {/* Modal untuk Menutup Permit */}
    //           {isCloseModalOpen && selectedPermitId && (
    //             <Modal onClose={handleCloseCloseModal}>
    //               <FormClosePermit
    //                 permitId={selectedPermitId}
    //                 onClose={handleCloseCloseModal}
    //                 mutate={mutate}
    //               />
    //             </Modal>
    //           )}

    // {/* Tabel Data Permit */}
    // <div className="overflow-x-scroll">
    //   {permitError ? (
    //     <PermitTable permitData={permitData} handleUpdateStatus={handleUpdateStatus} isAdmin={isAdmin} />
    //   ) : !permitData ? (
    //     <div>Loading...</div>
    //   ) : permitData.length === 0 ? (
    //     <div>No permit data available</div>
    //   ) : (
    //     <PermitTable permitData={permitData} handleUpdateStatus={handleUpdateStatus} isAdmin={isAdmin} />
    //   )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Wrapper>
    // </div>
  );
};

export default PermitDriving;
