import React, { useEffect, useState } from "react";
import { getUserWatchlist } from "../services/movie";
import { MoviesSection } from "../components/MoviesSection";
import { Movie } from "../models/Movie";

export function WatchlistPage() {
  const userId = localStorage.getItem("facebookId");
  const [watchlist, setWatchlist] = useState<Movie[] | undefined>(undefined);

  useEffect(() => {
    getUserWatchlist(userId as string).then((movies) => {
      setWatchlist(movies);
      console.log("Watchlist ", movies)
    });
  }, []);

  return <MoviesSection title="Watchlist" movies={watchlist} setMovies={setWatchlist} watchlist />;
}
