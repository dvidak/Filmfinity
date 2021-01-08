import React, { useEffect, useState } from "react";
import {
  getFacebookRecommendations,
  getPopularMovies,
  getRecommendations,
  getTrendingMovies,
  searchMovieByTitle,
} from "../services/movie";
import { MoviesSection } from "../components/MoviesSection";
import { Movie } from "../models/Movie";

export function SearchPage() {
  const [movies, setMovies] = useState<Movie[] | undefined>(
    []
  );

  const handleSearch = (e: any) => {
    e.preventDefault();
    const query = e.target.query.value;
    setMovies(undefined);
    searchMovieByTitle(query).then((movies) => {
      setMovies(movies)
    })
  };

  return (
    <div className="movie-list">
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Enter movie title..."
        />
        <input type="submit" value="Search" />
      </form>
      <MoviesSection
        title="Search results"
        movies={movies}
        setMovies={setMovies}
      />
    </div>
  );
}
