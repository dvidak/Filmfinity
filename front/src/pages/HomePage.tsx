import React, { useEffect, useState } from "react";
import { Header, Navbar, Movies } from "../components";
import { getFacebookRecommendations, getPopularMovies, getRecommendations, getTrendingMovies } from "../services/movie";
import loader from "../img/loader.gif";

export function HomePage() {
  const [popularMovies, setPopularMoivies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [fbRecommendations, setFbRecommendations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem('facebookId');

  useEffect(() => {
    getTrendingMovies().then((movies) => {setTrendingMovies(movies)});
    getPopularMovies().then((movies) => setPopularMoivies(movies));
    getFacebookRecommendations("10207920536328851").then((movies) => setFbRecommendations(movies as never));
    getRecommendations(userId as string).then((movies) => setRecommendations(movies));
  }, [userId]);

  useEffect(() => {
    if (popularMovies.length > 0 && trendingMovies.length > 0 && fbRecommendations.length > 0 && recommendations.length > 0) {
      setIsLoading(false)
    }
  }, [popularMovies, trendingMovies, fbRecommendations, recommendations])

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
                <Movies title="Recommended movies" movies={recommendations} />
                <Movies title="Based od Facebook" movies={fbRecommendations} />
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
