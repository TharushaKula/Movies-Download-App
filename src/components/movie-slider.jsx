import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

function AutoMovieSwiper() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Action");
  const categories = ["Action", "Adventure", "Comedy", "Sci-Fi", "Thriller"];

  // Swiper reference
  const swiperRef = useRef(null);

  // Fetch movies based on the selected category
  const fetchMovies = async (category) => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?genre=${category}&limit=10`
      );
      const data = await response.json();
      if (data.data.movies) {
        setMovies(data.data.movies);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle next and previous button clicks
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="my-10 px-10 lg:px-48">
      <h2 className="text-white text-4xl font-semibold mb-5">
        Trending Movies
      </h2>

      {/* Category Filters */}
      <div className="mt-5">
        <ul className="flex space-x-4 overflow-x-auto py-3">
          {categories.map((category) => (
            <li
              key={category}
              className={`text-white text-lg px-5 py-2 rounded-full cursor-pointer transition-transform transform hover:scale-110 
              ${
                category === selectedCategory ? "bg-blue-600 border" : "border"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Movie Swiper */}
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 2000, // Auto-slide every 3 seconds
          disableOnInteraction: false,
        }}
        speed={800} // Adjust speed to make transitions smoother
        pagination={{
          el: ".swiper-pagination",
          type: "progressbar",
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign swiper instance to ref
        modules={[Autoplay, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 }, // 1 slide on small screens
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="mt-10"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <motion.div
              className="relative group overflow-hidden rounded-2xl mt-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Movie Poster */}
              <motion.img
                src={movie.large_cover_image}
                alt={movie.title}
                className="object-cover w-full h-full rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <h3 className="text-white text-xl font-bold text-center mb-3">
                  {movie.title}
                </h3>
                <p className="text-white text-sm text-center mb-2">
                  {movie.year}
                </p>
                <p className="text-gray-300 text-center text-sm mb-4">
                  {movie.rating} IMDb Rating
                </p>
                <a
                  href={movie.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                  Watch Now
                </a>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Progress Bar */}
        <div className="swiper-pagination mb-10"></div>
      </Swiper>

      {/* Next and Previous Buttons */}
      <div className="flex mt-5 space-x-3 justify-center">
        <CircleChevronLeft
          stroke="#3b96f8"
          size={40}
          className="cursor-pointer"
          onClick={handlePrevSlide} // Handle previous slide
        />
        <CircleChevronRight
          stroke="#3b96f8"
          size={40}
          className="cursor-pointer"
          onClick={handleNextSlide} // Handle next slide
        />
      </div>
    </div>
  );
}

export default AutoMovieSwiper;
