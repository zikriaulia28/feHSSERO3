import {
  faChartLine,
  faClipboardCheck,
  faBars,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function MainLayout({ children, titlePage = "HOME", isLogedin = false }) {
  const [isShowMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!isShowMenu);
  const isName = Cookies.get("name");
  const role = Cookies.get("role");

  const isAdmin = role === "admin";

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/logout`,
        { method: "POST", credentials: "include" }
      );

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
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <header className="w-full flex-1 flex items-center md:gap-4 p-2 bg-[#0D92F4]">
        <button
          onClick={toggleMenu}
          className="border rounded-r-lg  px-2 bg-gray-200"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="w-8 h-8 md:w-12 md:h-12">
          <img
            src="/images/logo-tgi.webp"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-white text-sm text md:text-3xl font-bold">
          HSSE TGI RO 3
        </div>
        <div className="flex gap-4 ml-auto">
          {/* {["", "", ""].map((item, idx) => (
            <button key={idx}>Head {idx}</button>
          ))} */}
          <div className="flex items-center text-white gap-2 text-lg">
            <FontAwesomeIcon icon={faUser} />
            <span className="hidden sm:inline">Hi {isName}!</span>
          </div>
          {isLogedin ? (
            <button
              href="/"
              onClick={(e) => {
                e.preventDefault(); // Mencegah perilaku default tautan
                handleLogout(); // Panggil fungsi handleLogout
              }}
              className="flex items-center text-white hover:text-gray-300 gap-2 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          ) : (
            <button>Login</button>
          )}
        </div>
      </header>
      <div className="w-full flex-1 flex">
        {/* SIDE MENU */}
        <div
          className={`w-full md:w-fit flex flex-col p-2 bg-[#EEF7FF] gap-1 absolute md:static top-16 ${
            isShowMenu ? "left-0" : "-left-full"
          } transition-all duration-300`}
        >
          <Link
            to="/"
            title="Dashboard"
            className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faChartLine} />
            {isShowMenu && <span>Dashboard</span>}
          </Link>
          <Link
            to="/permit-driving"
            title="Permit Driving"
            className="flex justify-center items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
            {isShowMenu && <span>Permit Driving</span>}
          </Link>
          {isAdmin && (
            <Link
              to="/managementUsers"
              title="Management Users"
              className="flex justify-center items-center gap-2 bg-[#EE66A6] text-white px-4 py-3 rounded-lg hover:bg-[#D91656] transition duration-200"
            >
              <FontAwesomeIcon icon={faClipboardCheck} />
              {isShowMenu && <span>Management Users</span>}
            </Link>
          )}
          <Link
            to="/safeManHours"
            title="Safe Man Hours"
            className="flex justify-center items-center gap-2 bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
            {isShowMenu && <span>Safe Man Hours</span>}
          </Link>
          <Link
            to="/usaOrUsc"
            title="USA Or USC"
            className="flex justify-center items-center gap-2 bg-[#dfd991] text-white px-4 py-3 rounded-lg hover:bg-[#FFC700] transition duration-200"
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
            {isShowMenu && <span>USA OR USC</span>}
          </Link>
          <Link
            to="/ptwLog"
            title="Permit To Work Log"
            className="flex justify-center items-center gap-2 bg-[#37B7C3] text-white px-4 py-3 rounded-lg hover:bg-[#088395] transition duration-200"
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
            {isShowMenu && <span>Permit To Work Log</span>}
          </Link>
          {/* {Array.from({ length: 12 }).map((item, idx) => {
            return isShowMenu ? (
              <button key={idx} className="whitespace-nowrap p-2 bg-orange-300">
                ico-{idx} Title Menu
              </button>
            ) : (
              <button key={idx} className="whitespace-nowrap p-2 bg-orange-300">
                ico-{idx}
              </button>
            );
          })} */}
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full min-h-screen max-w-full flex-1 flex flex-col p-2 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">{titlePage}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
