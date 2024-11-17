import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function Navigation() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Fetch movies based on search query
  useEffect(() => {
    const fetchMovies = async () => {
      // Trim the search query to remove extra spaces
      const trimmedQuery = searchQuery.trim();
  
      if (trimmedQuery.length === 0) {
        setMovies([]);
        return;
      }
  
      setIsLoading(true);
  
      try {
        // Encode the query to handle spaces and special characters
        const encodedQuery = encodeURIComponent(trimmedQuery);
        const response = await fetch(
          `https://yts.mx/api/v2/list_movies.json?query_term=${encodedQuery}&limit=10&minimum_rating=6&order_by=desc`
        );
        const data = await response.json();
  
        if (data.status === "ok" && data.data.movies) {
          setMovies(data.data.movies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Debounce fetch
    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
          className={`transition-all duration-500 ${
            isSearchVisible ? "w-64 opacity-100" : "w-0 opacity-0"
          } overflow-hidden bg-gray-700 rounded-full`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative transition-all duration-500 px-4 py-2 w-full text-white bg-gray-700 rounded-full outline-none focus:ring-2 ring-blue-500"
          />
          {/* Dropdown for Search Results */}
          {isSearchVisible && searchQuery && (
            <div className="absolute top-[5rem] bg-gray-800 text-white w-64 max-h-80 overflow-y-auto shadow-lg rounded-lg z-50 custom-scrollbar">
              {isLoading ? (
                <p className="text-center py-2">Loading...</p>
              ) : movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <img
                      src={movie.medium_cover_image}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-sm">{movie.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-2">No movies found</p>
              )}
            </div>
          )}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="transition-all duration-500 px-4 py-2 w-full text-white bg-gray-700 rounded-full outline-none focus:ring-2 ring-blue-500"
            />
          </div>
          {/* Dropdown for Search Results */}
          {isSearchVisible && searchQuery && (
            <div className="absolute top-52 bg-gray-800 text-white w-64 max-h-80 overflow-y-auto shadow-lg rounded-lg z-50">
              {isLoading ? (
                <p className="text-center py-2">Loading...</p>
              ) : movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <img
                      src={movie.medium_cover_image}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-sm">{movie.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-2">No movies found</p>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
