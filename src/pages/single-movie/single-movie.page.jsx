function SingleMoviePage() {
  return (
    <>
      <section className="relative mb-36">
        <img
          className="h-screen w-full"
          src="https://yts.mx/assets/images/movies/spider_man_across_the_spider_verse_2023/background.jpg"
          alt=""
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black -z-999"></div>
        <div className="grid grid-cols-12 mx-20 absolute top-32 gap-5">
          <div className="col-span-3">
            <img
              className="object-cover rounded-xl h-[500px] w-full"
              src="https://yts.mx/assets/images/movies/spider_man_across_the_spider_verse_2023/large-cover.jpg"
              alt=""
            />
          </div>
          <div className="col-span-5 space-y-5">
            <p className="text-white">2024</p>
            <p className="text-white text-5xl font-bold">Spider Man</p>
            <p className="text-white">
              Miles Morales returns for the next chapter of the Oscar®-winning
              Spider-Verse saga, an epic adventure that will transport
              Brooklyn's full-time, friendly neighborhood Spider-Man across the
              Multiverse to join forces with Gwen Stacy and a new team of
              Spider-People to face off with a villain more powerful than
              anything they have ever encountered.—Sony Pictures
            </p>
            <div className="flex gap-5 text-white">
              <p>action</p>
              <p>adventure</p>
              <p>animation</p>
              <p>Triller</p>
            </div>
          </div>
          <div className="col-span-4">
            <button className="border border-green-400 w-full h-20 rounded-3xl text-white text-xl font-bold">Download</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleMoviePage;
