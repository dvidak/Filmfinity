import React, { useEffect, useState } from "react";
import { Header, Navbar } from "../components";
import { Movies } from "../components/Movies";
import { getPopularMovies, getTrendingMovies } from "../services/movie";

export function HomePage() {
  const [popularMovies, setPopularMoivies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then((movies) => setTrendingMovies(movies));
    getPopularMovies().then((movies) => setPopularMoivies(movies));
  }, []);

  return (
    <div className="homeWrapper">
      <Header />
      <div className="moviesWrapper">
        <Navbar />
        <div className="movieList">
          <Movies title="Trending movies" movies={trendingMovies} />
          <Movies title="Popular movies" movies={popularMovies} />
        </div>
      </div>
    </div>
  );
}
