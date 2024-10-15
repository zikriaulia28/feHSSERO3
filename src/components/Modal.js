import React, { useEffect } from 'react';

const Modal = ({ children, onClose }) => {

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Close modal when clicking outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-4 my-8 relative transition-transform transform duration-300 ease-in-out scale-100">
        {/* Content of the modal */}
        {children}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
