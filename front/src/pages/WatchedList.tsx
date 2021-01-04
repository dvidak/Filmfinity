import React, { useEffect, useState }  from "react";
import { Header, Navbar, Movies } from "../components";
import { getUserWatchedList } from "../services/movie";
import loader from "../img/loader.gif";

export function WatchedList() {
  const userId = localStorage.getItem('facebookId')
  const [watchedList, setWatchedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWatchedList(userId as string).then((movies) => {
        setWatchedList(movies)
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
					<Movies title="Watched list" movies={watchedList} watchedList />
        }
        </div>
      </div>
    </div>
  );
}
