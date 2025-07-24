import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // kalau ada role juga hapus
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div id="header-container" className="flex justify-between items-center p-4">
      {/* Search Bar */}
      <div id="search-bar" className="relative w-full max-w-lg">
        <input
          id="search-input"
          className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
          type="text"
          placeholder="Search Here..."
        />
        <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>

      {/* Icon & Profile Section */}
      <div id="icons-container" className="flex items-center space-x-4 relative">
        {/* Profile Section */}
        <div
          id="profile-container"
          className="flex items-center space-x-4 border-l pl-4 border-gray-300 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span id="profile-text" className="w-10 h-10 rounded-full">
            Hi! Admin
          </span>
          <img
            id="profile-avatar"
            src="../img/AvaM2.png"
            className="w-10 h-10 rounded-full"
            alt="Profile"
          />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 top-16 bg-white shadow-lg rounded-md py-2 w-40 z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
