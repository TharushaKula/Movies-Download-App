import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/movie-card.jsx';
import MovieSlider from "../../components/movie-slider.jsx";

function BrowsePage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  // Function to fetch movies based on the query
  const fetchMovies = async (searchTerm) => {
    setError(''); // Reset error message
    try {
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}`);
      const data = await response.json();
      if (data.data.movies.length > 0) {
        setMovies(data.data.movies);
      } else {
        setError('No movies found. Please try another search term.');
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error fetching movies. Please try again later.');
      setMovies([]);
    }
  };

  // Handle search on form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim()) {
      fetchMovies(query);
    } else {
      setError('Please enter a movie name.');
      setMovies([]);
    }
  };

  return (
    <>
      <section className="mx-16 mt-24">
        <h2 className="text-3xl font-bold text-white mb-5">Movie Search</h2>
        <form onSubmit={handleSubmit} className="mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie name..."
            className="border rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <MovieSlider></MovieSlider>
    </>
  );
}

export default BrowsePage;
