import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

function SectionSlider() {
  const [activeSection, setActiveSection] = useState("Trending");
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Fetch trending movies from the API
  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://yts.mx/api/v2/list_movies.json?sort_by=download_count&limit=6"
      );
      const data = await response.json();
      if (data.data.movies) {
        setTrendingMovies(data.data.movies);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "Trending") {
      fetchTrendingMovies();
    }
  }, [activeSection]);

  // Animation variants for smooth transitions
  const variants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, x: 200, transition: { duration: 0.6 } },
  };

  return (
    <section className="mx-5 lg:mx-48 mb-28 mt-32">
      {/* Navigation */}
      <ul className="flex text-white space-x-10 text-lg font-semibold pl-3 pb-5">
        {["Trending", "Recommendations", "Bookmarks", "Discover", "HDcompact"].map(
          (section) => (
            <li
              key={section}
              className={`cursor-pointer ${
                activeSection === section ? "text-yellow-500" : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          )
        )}
      </ul>

      {/* Trending Section */}
      {activeSection === "Trending" && (
        <motion.div
          className="gradient1 w-full h-full lg:h-[550px] rounded-2xl mb-10"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mx-5 lg:mx-16 pt-10 space-y-7">
            <p className="text-white text-3xl lg:text-5xl font-bold">
              Trending Now: Must-Watch Movies
            </p>
            <p className="text-white pb-3 text-lg w-full lg:w-[400px]">
              Discover the latest and greatest movies that are taking the world
              by storm. These must-watch films are the talk of the town!
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {trendingMovies.map((movie) => (
                <div className="h-[200px] rounded-xl" key={movie.id}>
                  <img
                    className="object-cover rounded-xl"
                    src={movie.medium_cover_image}
                    alt={movie.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recommendations Section */}
      {activeSection === "Recommendations" && (
        <motion.div
          className="gradient2 w-full h-full lg:h-[550px] rounded-2xl mb-10"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-14 mx-5 lg:mx-16">
            <div>
              <img src="/assets/img/reco.png" alt="Recommendations" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-white text-5xl font-bold pb-6">
                Your Next Favorite Film Awaits
              </p>
              <p className="text-white text-lg w-full lg:w-[400px] pb-6">
                Dive into a collection of carefully curated movies, selected
                based on your viewing history and favorite genres.
              </p>
              <button className="text-white text-xl px-7 border pt-3 pb-4 rounded-full mb-10 lg:mb-0">
                Recommend
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bookmarks Section */}
      {activeSection === "Bookmarks" && (
        <motion.div
          className="gradient3 w-full h-full lg:h-[550px] rounded-2xl mb-10"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
           <div className="grid grid-cols-1 lg:grid-cols-2 pt-5 mx-5 lg:mx-16">
            <div className="flex flex-col justify-center items-start">
              <p className="text-white text-5xl font-bold pb-6">
                Saved for Later: Your Personal Movie Library
              </p>
              <p className="text-white text-lg w-full lg:w-[400px] pb-6">
                Never forget a great film again! This personal movie library
                holds your saved titles, allowing you to revisit them whenever
                you're in the mood for cinematic magic.
              </p>
              <button className="text-white text-xl px-7 border pt-3 pb-4 rounded-full">
                Bookmark
              </button>
            </div>
            <div className="flex justify-center my-10 lg:my-10">
              <img
                className="object-cover h-full lg:h-[430px]"
                src="/assets/img/bookmark.png"
                alt="Bookmark"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Discover Section */}
      {activeSection === "Discover" && (
        <motion.div
          className="gradient4 w-full h-full lg:h-[550px] rounded-2xl mb-10"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
           <div className="grid grid-cols-1 lg:grid-cols-2 pt-20 mx-5 lg:mx-16 gap-5">
            <div className="flex">
              <img
                className="rounded-2xl"
                src="/assets/img/discover.png"
                alt="Discover"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-white text-5xl font-bold pb-6">
                Explore New Realms: Discover Hidden Gems
              </p>
              <p className="text-white text-lg w-full lg:w-[460px] pb-6">
                Dive into a collection of lesser-known films that promise unique
                narratives and unforgettable characters.
              </p>
              <button className="text-white text-xl px-7 border pt-3 pb-4 rounded-full flex items-center mb-10 lg:my-0">
                Discover <Search className="ml-2" strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* HDcompact Section */}
      {activeSection === "HDcompact" && (
        <motion.div
          className="gradient5 w-full h-full lg:h-[550px] rounded-2xl mb-10"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-14 mx-5 lg:mx-16">
            <div className="flex flex-col justify-center items-start">
              <p className="text-white text-5xl font-bold pb-6">
                HDcompact: Maximum Quality, Minimum Size
              </p>
              <p className="text-white text-lg w-[400px] pb-6">
                Experience the sharpest HD movies without worrying about large
                file sizes.
              </p>
              <button className="text-white text-xl px-7 border pt-3 pb-4 rounded-full">
                Bookmark
              </button>
            </div>
            <div className="flex justify-center my-10 lg:my-0">
              <img
                className="object-cover h-[430px]"
                src="/assets/img/bookmark.png"
                alt="HDcompact"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default SectionSlider;
