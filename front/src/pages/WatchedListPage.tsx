import React, { useEffect, useState } from "react";
import { getUserWatchedList } from "../services/movie";
import loader from "../img/loader.gif";
import { MoviesSection } from "../components/MoviesSection";

export function WatchedListPage() {
  const userId = localStorage.getItem("facebookId");
  const [watchedList, setWatchedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWatchedList(userId as string).then((movies) => {
      setWatchedList(movies);
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
        <MoviesSection title="Watched list" movies={watchedList} watchedList />
      )}
    </div>
  );
}
