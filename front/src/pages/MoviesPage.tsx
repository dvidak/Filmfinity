import React, { useEffect, useState } from "react";
import { getPopularMovies, getTrendingMovies } from "../services/movie";
import { MoviesSection } from "../components/MoviesSection";
import { Movie } from "../models/Movie";

export function MoviesPage() {
  const [popularMovies, setPopularMoivies] = useState<Movie[] | undefined>(
    undefined
  );
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | undefined>(
    undefined
  );

  const userId = localStorage.getItem("facebookId");
  const userToken = localStorage.getItem("token");

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
      <MoviesSection
        title="Trending movies"
        movies={trendingMovies}
        setMovies={setTrendingMovies}
      />
      <MoviesSection
        title="Popular movies"
        movies={popularMovies}
        setMovies={setPopularMoivies}
      />
    </div>
  );
}
