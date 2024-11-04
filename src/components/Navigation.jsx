import React, { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function Navigation() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="card flex justify-between items-center px-8 py-4 bg-opacity-90 shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Left side: Logo */}
      <div className="text-3xl font-bold text-white">Flix.id</div>

      {/* Center: Menu items */}
      <div className="hidden md:flex items-center space-x-8 bg-gray-900 text-white px-6 py-3 rounded-full">
        <Link to="/" className="hover:text-gray-400 transition duration-300">
          Home
        </Link>
        <Link
          to="/movies"
          className="hover:text-gray-400 transition duration-300"
        >
          Movies
        </Link>
        <a
          href="/browse"
          className="hover:text-gray-400 transition duration-300"
        >
          Browse
        </a>

        {/* Search Button */}
        <button onClick={toggleSearch} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>

        {/* Animated Search Input */}
        <div
          className={`relative transition-all duration-500 ${
            isSearchVisible ? "w-48 opacity-100" : "w-0 opacity-0"
          } overflow-hidden bg-gray-700 rounded-full`}
        >
          <input
            type="text"
            placeholder="Search..."
            className={`transition-all duration-500 px-4 py-2 w-full text-white bg-gray-700 rounded-full outline-none focus:ring-2 ring-blue-500 ${
              isSearchVisible ? "visible" : "hidden"
            }`}
          />
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleMenu}
        className="block md:hidden focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      {/* Right side: Profile Section */}
      <div className="hidden md:flex items-center justify-center space-x-4">
        {/* Bookmark with badge */}
        <Badge badgeContent={6} color="primary">
          <BookmarkIcon color="action" />
        </Badge>

        {/* Bell icon with notification dot */}
        <div className="relative">
          <i className="fas fa-bell text-gray-400 text-xl"></i>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User avatar and details */}
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-white">Sarah J</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
          <i className="fas fa-chevron-down text-gray-400"></i>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
          <a
            href="/movie"
            className="hover:text-gray-400 transition duration-300"
          >
            Movie
          </a>
          <a
            href="#series"
            className="hover:text-gray-400 transition duration-300"
          >
            Series
          </a>
          <a
            href="#originals"
            className="hover:text-gray-400 transition duration-300"
          >
            Originals
          </a>

          {/* Search Button */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleSearch} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <div
              className={`relative transition-all duration-500 ${
                isSearchVisible ? "w-48 opacity-100" : "w-0 opacity-0"
              } overflow-hidden bg-gray-700 rounded-full`}
            >
              <input
                type="text"
                placeholder="Search..."
                className={`transition-all duration-500 px-4 py-2 w-full text-white bg-gray-700 rounded-full outline-none focus:ring-2 ring-blue-500 ${
                  isSearchVisible ? "visible" : "hidden"
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
