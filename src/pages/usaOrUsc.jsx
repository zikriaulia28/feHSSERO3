import React, { useState, useEffect } from "react";
import FormFindingUsaUsc from "../components/FormFindingUsaUsc"; // Assuming you have a form component for adding cars
import Modal from "../components/Modal";
import MainLayout from "../components/MainLayout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FindingTable from "../components/FindingTable";
import Cookies from "js-cookie";

const UsaOrUsc = () => {
  useEffect(() => {
    document.title = "USA OR USC - HSSE TGI RO 3";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const role = Cookies.get("role");
  const isAdmin = role === "admin";

  return (
    <MainLayout
      titlePage="Finding USA(Unsafe Action) And USC(Unsafe Codition)"
      isLogedin={true}
    >
      <button
        onClick={handleOpenModal}
        className="w-fit flex items-center gap-2 bg-blue-500 mb-4 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
      >
        <h2>Add Finding</h2>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <FormFindingUsaUsc onClose={handleCloseModal} />
        </Modal>
      )}
      <div className="overflow-x-auto">
        <FindingTable isAdmin={isAdmin} />
      </div>
    </MainLayout>
  );
};

export default UsaOrUsc;
