import React, { useEffect, useState } from "react";
import { getUserWatchlist } from "../services/movie";
import loader from "../img/loader.gif";
import { MoviesSection } from "../components/MoviesSection";

export function WatchlistPage() {
  const userId = localStorage.getItem("facebookId");
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWatchlist(userId as string).then((movies) => {
      setWatchlist(movies);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <div className="movie-list">
      {isLoading ? (
        <div className="loader">
          <img src={loader} className="loader-gif" alt="loading" />
        </div>
      ) : (
        <MoviesSection title="Watchlist" movies={watchlist} watchlist />
      )}
    </div>
  );
}
