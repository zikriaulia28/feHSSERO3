// src/pages/PermitDriving.js
import React, { useState, useEffect } from 'react';
import usePermitData from '../hooks/usePermitData';
import PermitTable from '../components/PermitTable';
import FormClosePermit from '../components/FormClosePermit';
import FormPermitDriving from '../components/FormPermitDriving';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Cookies from 'js-cookie';
import Wrapper from '../utils/wrapper'
import MainLayout from '../components/MainLayout';

const PermitDriving = () => {
  useEffect(() => {
    document.title = 'Permit Driving - HSSE TGI RO 3';
  }, []);
  const { permitData, permitError, mutate, handleUpdateStatus } = usePermitData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [selectedPermitId, setSelectedPermitId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Status sidebar

  // Handle buka dan tutup modal Buat Permit
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const role = Cookies.get('role');

  const isAdmin = role === "admin";

  // Handle buka dan tutup modal Tutup Permit
  const handleOpenCloseModal = (permitId) => {
    setSelectedPermitId(permitId);
    setIsCloseModalOpen(true);
  };

  const handleCloseCloseModal = () => {
    setIsCloseModalOpen(false);
    setSelectedPermitId(null);
  };

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <MainLayout titlePage='Data Penggunaan Kendaraan' isLogedin={true}>
      {/* Tabel Data Permit */}
      <div className="overflow-x-scroll">
        {permitError ? (
          <PermitTable permitData={permitData} handleUpdateStatus={handleUpdateStatus} isAdmin={isAdmin} />
        ) : !permitData ? (
          <div>Loading...</div>
        ) : permitData.length === 0 ? (
          <div>No permit data available</div>
        ) : (
          <PermitTable permitData={permitData} handleUpdateStatus={handleUpdateStatus} isAdmin={isAdmin} />
        )}
      </div>
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