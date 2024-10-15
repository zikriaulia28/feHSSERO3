import React, { useState, useEffect } from 'react';
import useCarData from '../hooks/useCarData'; // Assuming you have a hook for fetching car data
import CarTable from '../components/CarsTable';
import FormCar from '../components/FormCar'; // Assuming you have a form component for adding cars
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Cars = () => {
  useEffect(() => {
    document.title = 'Cars - HSSE TGI RO 3';
  }, []);
  const { carData, carError, mutate } = useCarData(); // Fetch car data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar function

  if (carError) return <div className="text-red-500">Error loading data...</div>;
  if (!carData) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="m-4 p-6 border rounded-xl bg-white shadow-md flex-grow">
          <h1 className="text-3xl font-semibold mb-4 text-blue-600">Data Mobil</h1>

          {/* Button to add new car */}
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
          >
            Tambah Data Mobil
          </button>

          {/* Modal */}
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <FormCar onClose={handleCloseModal} mutate={mutate} />
            </Modal>
          )}
          <div className="overflow-x-auto">
            <CarTable carData={carData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
