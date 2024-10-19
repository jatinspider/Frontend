import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overdue");
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg sticky h-20 w-full">
      <div className="container mx-auto p-4 flex justify-between items-center h-full">
        <div className="flex items-center justify-between w-full md:w-auto">
          <img src="/logo_mobile.png" alt="Logo" className="h-full max-h-16" />
        </div>
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-lg text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition duration-300"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="text-lg text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition duration-300"
          >
            Profile
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="text-lg text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => console.log("Toggle mobile menu")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <nav className="md:hidden bg-gray-900 space-y-2 p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="block text-lg text-white hover:bg-gray-700 px-4 py-2 rounded"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/assignments")}
          className="block text-lg text-white hover:bg-gray-700 px-4 py-2 rounded"
        >
          Assignments
        </button>
        <button
          onClick={() => navigate("/submissions")}
          className="block text-lg text-white hover:bg-gray-700 px-4 py-2 rounded"
        >
          Submissions
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="block text-lg text-white hover:bg-gray-700 px-4 py-2 rounded"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="block text-lg text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Nav Pills */}

      <nav className="bg-gray-100 p-4 border-b">
        <ul className="flex justify-center space-x-4">
          <li>
            <button
              onClick={() => setActiveTab("Overdue")}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeTab === "Overdue"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Overdue Assignment
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("Ongoing")}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeTab === "Ongoing"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Ongoing Assignment
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("Completed")}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                activeTab === "Completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Completed Assignment
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
