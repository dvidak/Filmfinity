import React, { useEffect, useState } from "react";
import {
  getFacebookRecommendations,
  getPopularMovies,
  getRecommendations,
  getTrendingMovies,
} from "../services/movie";
import { MoviesSection } from "../components/MoviesSection";
import { Movie } from "../models/Movie";

export function HomePage() {
  const [popularMovies, setPopularMoivies] = useState<Movie[] | undefined>(
    undefined
  );
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | undefined>(
    undefined
  );
  const [fbRecommendations, setFbRecommendations] = useState<
    Movie[] | undefined
  >(undefined);
  const [recommendations, setRecommendations] = useState<Movie[] | undefined>(
    undefined
  );

  const userId = localStorage.getItem("facebookId");

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      setTrendingMovies(movies);
    });
    getPopularMovies().then((movies) => setPopularMoivies(movies));
    getFacebookRecommendations(userId as string).then((movies) =>
      setFbRecommendations(movies as never)
    );
    getRecommendations(userId as string).then((movies) =>
      setRecommendations(movies)
    );
  }, [userId]);

  return (
    <div className="movie-list">
      <MoviesSection title="Recommended movies" movies={recommendations} />
      <MoviesSection title="Based od Facebook" movies={fbRecommendations} />
      <MoviesSection title="Trending movies" movies={trendingMovies} />
      <MoviesSection title="Popular movies" movies={popularMovies} />
    </div>
  );
}
