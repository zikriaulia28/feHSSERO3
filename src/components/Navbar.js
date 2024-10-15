import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBars, faTimes, faChartLine, faIdBadge, faCarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isName = Cookies.get('name')
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/logout`, { method: "POST", credentials: "include" });

      if (response.ok) {
        // Redirect ke halaman login
        window.location.href = "/login"; // Ganti dengan URL login Anda
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <img
              src="/images/logo-tgi.webp"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-white text-2xl sm:text-3xl font-semibold">
            HSSE TGI RO 3
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="block sm:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>

        {/* Menu Items - Hidden on Mobile, Shown on Larger Screens */}
        <div className="hidden sm:flex items-center gap-8">
          <div className="flex items-center text-white gap-2 text-lg">
            <FontAwesomeIcon icon={faUser} />
            <span className="hidden sm:inline">Hi! {isName}</span>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault(); // Mencegah perilaku default tautan
              handleLogout(); // Panggil fungsi handleLogout
            }}
            className="flex items-center text-white hover:text-gray-300 gap-2 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </a>
        </div>

        {/* Mobile Menu - Show when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-500 text-white p-4 sm:hidden">
            <div className="flex flex-col gap-4">
              {/* Links from Sidebar */}
              <Link
                to="/"
                className="flex items-center gap-2 bg-blue-400 md:bg-blue-500 text-white px-4 py-3 rounded-lg transition duration-200"
              >
                <FontAwesomeIcon icon={faChartLine} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/permit-driving"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg transition duration-200"
              >
                <FontAwesomeIcon icon={faIdBadge} />
                <span>Permit Driving</span>
              </Link>

              <Link
                to="/cars"
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg transition duration-200"
              >
                <FontAwesomeIcon icon={faCarAlt} />
                <span>Data Cars</span>
              </Link>

              {/* User Greeting */}
              <div className="flex items-center text-white gap-2 text-lg">
                <FontAwesomeIcon icon={faUser} />
                <span>Hi! {isName}</span>
              </div>

              {/* Logout Button */}
              <a
                href="/"
                className="flex items-center text-white gap-2 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
