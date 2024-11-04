import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Import pagination CSS
import { Navigation, Pagination } from "swiper/modules";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

function ThrillerSwiper() {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null); // Reference to the Swiper instance

  // Fetch thriller movies from the API
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://yts.mx/api/v2/list_movies.json?genre=thriller&limit=10"
      );
      const data = await response.json();
      if (data.data.movies) {
        setMovies(data.data.movies);
      }
    } catch (error) {
      console.error("Error fetching thriller movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Custom navigation handlers
  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="my-20 mx-48">
      <h2 className="text-3xl text-white font-bold mb-6">Thriller Movies</h2>

      <Swiper
        ref={swiperRef} // Attach swiper instance to ref
        spaceBetween={20}
        slidesPerView={4}  
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination", // Custom pagination class
        }}
        modules={[Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="thriller-movie-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="group relative">
              {/* Movie Poster */}
              <img
                src={movie.large_cover_image}
                alt={movie.title}
                className="rounded-lg object-cover w-full h-[400px]"
              />
              {/* Movie Details on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-bold mb-2">
                  {movie.title}
                </h3>
                <p className="text-gray-300 mb-2">{movie.year}</p>
                <p className="text-gray-400 mb-4">{movie.rating} IMDb</p>
                <a
                  href={movie.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                  Watch Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Pagination */}
      <div className="custom-swiper-pagination mt-4"></div> {/* Add margin for spacing */}

      {/* Custom Swiper Navigation */}
      <div className="flex mt-5 space-x-3 justify-end">
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
    </section>
  );
}

export default ThrillerSwiper;
