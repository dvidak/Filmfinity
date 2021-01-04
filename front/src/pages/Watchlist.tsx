import React, { useEffect, useState }  from "react";
import { Header, Navbar, Movies } from "../components";
import { getUserWatchlist } from "../services/movie";
import loader from "../img/loader.gif";

export function Watchlist() {
  const userId = localStorage.getItem('facebookId')
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWatchlist(userId as string).then((movies) => {
        setWatchlist(movies)
        setIsLoading(false)
    });
  }, [userId])

  return (
    <div className="home-wrapper">
      <Header />
      <div className="movies-wrapper">
        <Navbar />
        <div className="movie-list">
        {isLoading ? 
					<div className="loader">
						<img src={loader} className="loader-gif" alt="loading" />
					</div> : 
					<Movies title="Watchlist" movies={watchlist} watchlist/>
        }
        </div>
      </div>
    </div>
  );
}
