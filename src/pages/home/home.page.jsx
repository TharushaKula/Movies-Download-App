import MovieSlider from "../../components/movie-slider";
import AutoMovieSwiper from "./components/section-slider";
import ActionSwiper from "./components/action-swiper";
import AdventureSwiper from "./components/adventure-swiper";
import ThrillerSwiper from "./components/thriller-swiper";
import { Medal } from "lucide-react";

function HomePage() {
  return (
    <>
      <section className="mt-40 mb-28 flex items-start justify-center">
        <div className="text-center flex flex-col items-center">
          <p className="text-white text-6xl font-bold pb-8">
            Find Your Next Favorite Movie Here!
          </p>
          <p className="text-white text-lg w-[550px] pb-8">
            Not sure what to watch next? Discover your new favorite movie in our
            expansive collection of top-rated films from every genre. Explore,
            download, and enjoy!
          </p>
          <button className="text-white text-xl border px-7 py-3 rounded-full">
            Explore
          </button>
        </div>
      </section>
      <AutoMovieSwiper></AutoMovieSwiper>

      <ActionSwiper></ActionSwiper>
      <AdventureSwiper></AdventureSwiper>
      <ThrillerSwiper></ThrillerSwiper>

      {/* 3 movies section */}
      <section className="gradient5 w-full">
        <div className="grid grid-cols-4 gap-5 py-10 mx-48">
          <div>
            <img
              className="object-cover h-[350px] w-full rounded-xl"
              src="https://yts.mx/assets/images/movies/spider_man_no_way_home_2021/large-cover.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="object-cover h-[350px] w-full rounded-xl"
              src="https://yts.mx/assets/images/movies/spider_man_no_way_home_2021/large-cover.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="object-cover h-[350px] w-full rounded-xl"
              src="https://yts.mx/assets/images/movies/spider_man_no_way_home_2021/large-cover.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-5xl text-white font-bold">Name</p>
            <p className="text-2xl font-semibold">It's all here</p>
            <button className="text-white text-xl border px-7 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Best Features Section */}
      <section className="my-14">
        <div className="flex mx-48 items-center">
          <p className="text-5xl text-white font-bold">
            Best Features That Won't Disappoint
          </p>
          <p className="text-xl text-white font-normal">
            What makes you have to try our service is the features you will
            enjoy from us
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 mx-48 gap-5">
          <div className="flex space-x-3">
            <div>
              <Medal size={40} stroke="red" />
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-3xl text-white font-semibold">
                Official Movies
              </p>
              <p className="text-base text-white font-normal">
                We provide new movies that are ready to be shown in cinemas on
                this platform
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div>
              <Medal size={40} stroke="red" />
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-3xl text-white font-semibold">
                Official Movies
              </p>
              <p className="text-base text-white font-normal">
                We provide new movies that are ready to be shown in cinemas on
                this platform
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div>
              <Medal size={40} stroke="red" />
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-3xl text-white font-semibold">
                Official Movies
              </p>
              <p className="text-base text-white font-normal">
                We provide new movies that are ready to be shown in cinemas on
                this platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Moies collection section */}
      <section className="relative my-20">
        <div>
          <img
            className="object-cover w-full h-[350px]"
            src="/assets/collection.jpg"
            alt=""
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pr-10">
          <p className="text-5xl font-bold text-white">Name</p>
          <p className="text-3xl font-medium text-white">THE ONE TO DOWNLOAD</p>
          <p className="text-xl font-light text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nam
            dolor placeat illo velit nemo.
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
