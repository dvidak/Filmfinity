import React, { useEffect, useState } from "react";
import { getUserWatchedList } from "../services/movie";
import { MoviesSection } from "../components/MoviesSection";
import { Movie } from "../models/Movie";

export function WatchedListPage() {
  const userId = localStorage.getItem("facebookId");
  const [watchedList, setWatchedList] = useState<Movie[] | undefined>(
    undefined
  );

  useEffect(() => {
    getUserWatchedList(userId as string).then((movies) => {
      setWatchedList(movies);
    });
  }, []);

  return (
    <MoviesSection title="Watched list" movies={watchedList} setWatchedList={setWatchedList} watchedList />
  );
}
