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
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    getTrendingMovies(userId as string).then((movies) => {
      setTrendingMovies(movies);
    });
    getPopularMovies(userId as string).then((movies) =>
      setPopularMoivies(movies)
    );
    getFacebookRecommendations(userId as string).then((movies) => {
      const fbRecMovies = movies
        .map((a: any) => ({ sort: Math.random(), value: a }))
        .sort((a: any, b: any) => a.sort - b.sort)
        .map((a: any) => a.value)
        .slice(0, 10);
      setFbRecommendations(fbRecMovies);
    });
    getRecommendations(userId as string).then((movies) => {
      const recMovies = movies
        .map((a: any) => ({ sort: Math.random(), value: a }))
        .sort((a: any, b: any) => a.sort - b.sort)
        .map((a: any) => a.value)
        .slice(0, 10);
      setRecommendations(recMovies);
    });
  }, [userId]);

  return (
    <div className="movie-list">
      <MoviesSection
        title="Recommended movies"
        movies={recommendations}
        setMovies={setRecommendations}
      />
      <MoviesSection
        title="Based on Facebook"
        movies={fbRecommendations}
        setMovies={setFbRecommendations}
      />
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
