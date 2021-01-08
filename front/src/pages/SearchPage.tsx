import React, { useEffect, useState } from "react";
import {
  getFacebookRecommendations,
  getPopularMovies,
  getRecommendations,
  getTrendingMovies,
} from "../services/movie";
import { MoviesSection } from "../components/MoviesSection";
import { Movie } from "../models/Movie";

export function SearchPage() {
  const [popularMovies, setPopularMoivies] = useState<Movie[] | undefined>(
    undefined
  );
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | undefined>(
    undefined
  );

  const userId = localStorage.getItem("facebookId");
  const userToken = localStorage.getItem("token");

  const handleSearch = (e: any) => {
    e.preventDefault();
    const query = e.target.query.value;
    console.log("Pola, ovo je unos u polje", query);
  };

  useEffect(() => {
    getTrendingMovies(userId as string).then((movies) => {
      setTrendingMovies(movies);
    });
    getPopularMovies(userId as string).then((movies) =>
      setPopularMoivies(movies)
    );
  }, [userId]);

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
        movies={trendingMovies}
        setMovies={setTrendingMovies}
      />
    </div>
  );
}
