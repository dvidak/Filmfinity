import React, { useEffect, useState } from "react";
import { Header, Navbar, Movies } from "../components";
import { getPopularMovies, getTrendingMovies } from "../services/movie";
import loader from "../img/loader.gif";

export function HomePage() {
  const [popularMovies, setPopularMoivies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      setTrendingMovies(movies); 
      console.log("trending ", movies)
    });
    getPopularMovies().then((movies) => setPopularMoivies(movies));
  }, []);

  useEffect(() => {
    if (popularMovies.length > 0 && trendingMovies.length > 0) {
      setIsLoading(false)
    }
  }, [popularMovies, trendingMovies])

  return (
      <>
        <div className="home-wrapper">
          <Header />
          <div className="movies-wrapper">
            <Navbar />
            <div className="movie-list">
            {isLoading ? 
              <div className="loader">
                <img src={loader} className="loader-gif" alt="loading"/>
              </div> : 
              <>
                <Movies title="Trending movies" movies={trendingMovies} />
                <Movies title="Popular movies" movies={popularMovies} />
              </>
            }
            </div>
          </div>
        </div>
      </>
  );
}
