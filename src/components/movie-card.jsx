import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="relative overflow-hidden bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img
        className="w-full h-80 object-cover rounded-lg transition-transform duration-300"
        src={movie.large_cover_image}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300 group-hover:opacity-75"></div>
      <div className="relative p-4 z-10">
        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
        <p className="text-gray-300">Year: {movie.year}</p>
        <p className="text-gray-300">IMDb: {movie.imdb_code}</p>
        <p className="text-gray-300">Rating: {movie.rating} ({movie.mpa_rating})</p>
        <p className="text-gray-400 mt-2 line-clamp-3">{movie.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {movie.torrents.map((torrent) => (
            <a
              key={torrent.hash}
              href={torrent.url}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow transition-transform duration-300 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              {torrent.quality} ({torrent.size})
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
