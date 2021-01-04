import React from "react";

import addToWatchImg from "../img/addToWatch.png";
import addToWatchedImg from "../img/addToWatched.png";
import deleteImg from "../img/delete.png";
import { Movie } from "../models/Movie";
import { addToWatchedList, addToWatchlist, deleteFromWatchlist, deleteFromWatchedList } from "../services/movie";

interface Props {
  title: string;
  movies: Movie[];
  watchlist?: boolean;
  watchedList?: boolean;
}

export function Movies(props: Props) {
  const posterUrl = "https://image.tmdb.org/t/p/w185/";
  const userId = localStorage.getItem('facebookId')

  const handleAddToWatchlist = (movieId: string) => {
    addToWatchlist(userId as string, movieId)
  }

  const handleDeleteFromWatchlist = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId)
  }

  const handleAddToWatchedList = (movieId: string) => {
    addToWatchedList(userId as string, movieId)
  }

  const handleDeleteFromWatchedList = (movieId: string) => {
    deleteFromWatchedList(userId as string, movieId)
  }

  const handleRemoveToWatchedList = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId)
    addToWatchedList(userId as string, movieId)
  }

  return (
    <>
      <h2 className="movie-list-category">{props.title}</h2>
      <div className="movies">
        {props.movies.length > 0 &&
          props.movies.map((movie: Movie) => {
            return (
              <div className="movie" key={movie.title}>
                <img
                  src={posterUrl + movie.poster}
                  className="movie-img"
                  alt={movie.title}
                  key={movie.popularity}
                />
                <div className="movie-details">
                  <h4 className="movie-details-title">{movie.title}</h4>
                  <div className="movie-details-buttons">
                    {props.watchlist ?
                      <>
                        <button className="movie-details-button">
                          <img className="icon-delete" src={deleteImg} alt="" onClick={() => handleDeleteFromWatchlist(`${movie.traktId}`)} />
                        </button>
                        <button className="movie-details-button">
                          <img className="icon-like" src={addToWatchedImg} alt="" onClick={() => handleRemoveToWatchedList(`${movie.traktId}`)} />
                        </button>
                      </> : 
                      props.watchedList ? 
                      <>
                        <button className="movie-details-button">
                          <img className="icon-delete" src={deleteImg} alt="" onClick={() => handleDeleteFromWatchedList(`${movie.traktId}`)} />
                        </button>
                      </> :
                      <>
                        <button className="movie-details-button">
                          <img className="icon-watch" src={addToWatchImg} alt="" onClick={() => handleAddToWatchlist(`${movie.traktId}`)} />
                        </button>
                        <button className="movie-details-button">
                          <img className="icon-like" src={addToWatchedImg} alt="" onClick={() => handleAddToWatchedList(`${movie.traktId}`)} />
                        </button>
                      </>
                    }
                    
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
