import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

function MovieMetadataAnalytics() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedRating, setSelectedRating] = useState(5);
  const genres = ['All', 'Action', 'Comedy', 'Sci-Fi', 'Thriller', 'Drama'];
  const years = ['All', '2024', '2023', '2022', '2021', '2020'];

  // Fetch movies from API (Genre and Year based filtering)
  const fetchMovies = async () => {
    try {
      const genreQuery = selectedGenre !== 'All' ? `genre=${selectedGenre}` : '';
      const yearQuery = selectedYear !== 'All' ? `year=${selectedYear}` : '';
      const url = `https://yts.mx/api/v2/list_movies.json?${genreQuery}&${yearQuery}&limit=50`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.data.movies) {
        setMovies(data.data.movies);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, selectedYear]);

  // Chart Data
  const getGenreDistribution = () => {
    const genreCounts = genres.reduce((acc, genre) => {
      acc[genre] = movies.filter(movie => movie.genres && movie.genres.includes(genre)).length;
      return acc;
    }, {});
    return {
      labels: Object.keys(genreCounts),
      datasets: [
        {
          label: 'Movies by Genre',
          data: Object.values(genreCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ],
    };
  };

  const getYearlyReleaseTrend = () => {
    const yearCounts = years.reduce((acc, year) => {
      acc[year] = movies.filter(movie => movie.year === year).length;
      return acc;
    }, {});
    return {
      labels: Object.keys(yearCounts),
      datasets: [
        {
          label: 'Movies Released Per Year',
          data: Object.values(yearCounts),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    };
  };

  const getAverageRating = () => {
    const totalRatings = movies.reduce((acc, movie) => acc + movie.rating, 0);
    const avgRating = totalRatings / movies.length;
    return avgRating.toFixed(1);
  };

  // Handle Filter Changes
  const handleGenreChange = (e) => setSelectedGenre(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleRatingChange = (e) => setSelectedRating(e.target.value);

  return (
    <div className="movie-analytics-container">
      <h1 className="page-title">Movie Metadata Analytics</h1>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-option">
          <label>Genre</label>
          <select value={selectedGenre} onChange={handleGenreChange}>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-option">
          <label>Year</label>
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-option">
          <label>Minimum Rating</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={selectedRating}
            onChange={handleRatingChange}
          />
          <span>{selectedRating}</span>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <div className="chart-container">
          <h2>Movie Distribution by Genre</h2>
          <Doughnut data={getGenreDistribution()} />
        </div>

        <div className="chart-container">
          <h2>Movie Release Trend by Year</h2>
          <Line data={getYearlyReleaseTrend()} />
        </div>

        <div className="chart-container">
          <h2>Average IMDb Rating</h2>
          <p className="average-rating">{getAverageRating()}</p>
        </div>

        {/* Heatmap or Comparison chart can be added here */}
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .movie-analytics-container {
          padding: 40px;
          background-color: #141414;
          color: white;
          font-family: 'Arial', sans-serif;
        }

        .page-title {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 40px;
        }

        .filter-section {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .filter-option {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .filter-option select,
        .filter-option input {
          width: 150px;
          padding: 8px;
          background: #333;
          border: none;
          color: white;
          margin-top: 10px;
        }

        .analytics-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        .chart-container {
          background: #222;
          padding: 20px;
          border-radius: 10px;
        }

        .average-rating {
          font-size: 2.5rem;
          text-align: center;
          color: #36A2EB;
        }
      `}</style>
    </div>
  );
}

export default MovieMetadataAnalytics;
