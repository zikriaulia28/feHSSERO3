import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCar, faClipboardCheck, faBars } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'; // Menggunakan js-cookie untuk mengakses token dari cookies

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const role = Cookies.get('role');
  const isAdmin = role === "admin";
  console.log(isAdmin)

  // Fungsi untuk toggle sidebar ketika tombol di klik
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hidden md:block">
      {/* Tombol burger untuk desktop */}
      <div
        className="sticky top-4 left-0 z-40 p-2 text-gray-900 text-lg cursor-pointer border rounded-r-lg bg-gray-200"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 h-full left-0 z-30 w-64 bg-gray-100 px-6 py-20 shadow-lg transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onMouseEnter={() => setIsOpen(true)}   // Tetap terbuka saat dihover
        onMouseLeave={() => setIsOpen(false)}  // Tertutup saat hover keluar dari sidebar
      >
        {/* Isi Sidebar */}
        <div className="flex flex-col gap-4 h-full">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faChartLine} />
            <span>Dashboard</span>
          </Link>
          {isAdmin &&
            <>
              <Link
                to="/permit-driving"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-200"
              >
                <FontAwesomeIcon icon={faClipboardCheck} />
                <span>Permit Driving</span>
              </Link>
              <Link
                to="/cars"
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                <FontAwesomeIcon icon={faCar} />
                <span>Data Cars</span>
              </Link>
              <Link
                to="/safeManHours"
                className="flex items-center gap-2 bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition duration-200"
              >
                <FontAwesomeIcon icon={faClipboardCheck} />
                <span>Safe Man Hours</span>
              </Link>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
