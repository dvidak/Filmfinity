import React from "react";
import { useHistory } from "react-router-dom";

import addToWatchImg from "../img/addToWatch.png";
import addToWatchedImg from "../img/addToWatched.png";
import deleteImg from "../img/delete.png";
import { Movie } from "../models/Movie";
import {
  addToWatchedList,
  addToWatchlist,
  deleteFromWatchlist,
  deleteFromWatchedList,
} from "../services/movie";

import "./movies-section-style.css";

interface Props {
  title: string;
  movies: Movie[];
  watchlist?: boolean;
  watchedList?: boolean;
}

export function MoviesSection(props: Props) {
  const posterUrl = "https://image.tmdb.org/t/p/w185/";
  const userId = localStorage.getItem("facebookId");
  const history = useHistory();

  const routeChange = (movieId: string) => {
    let path = `/movie/${movieId}`;
    history.push(path);
  };

  const handleAddToWatchlist = (movieId: string) => {
    addToWatchlist(userId as string, movieId);
  };

  const handleDeleteFromWatchlist = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId);
  };

  const handleAddToWatchedList = (movieId: string) => {
    addToWatchedList(userId as string, movieId);
  };

  const handleDeleteFromWatchedList = (movieId: string) => {
    deleteFromWatchedList(userId as string, movieId);
  };

  const handleRemoveToWatchedList = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId);
    addToWatchedList(userId as string, movieId);
  };

  return (
    <>
      <h2 className="movie-list-category">{props.title}</h2>
      <div className="movies">
        {props.movies.length > 0 &&
          props.movies.map((movie: Movie) => {
            return (
              <div
                className="movie"
                key={movie.title}
                onClick={() => routeChange(movie.traktId)}
              >
                <img
                  src={posterUrl + movie.poster}
                  className="movie-img"
                  alt={movie.title}
                  key={movie.popularity}
                />
                <div className="movie-details">
                  <h4 className="movie-details-title">{movie.title}</h4>
                  <div className="movie-details-buttons">
                    {props.watchlist ? (
                      <>
                        <button
                          className="movie-details-button"
                          onClick={() =>
                            handleDeleteFromWatchlist(`${movie.traktId}`)
                          }
                        >
                          <img className="icon-delete" src={deleteImg} alt="" />
                        </button>
                        <button
                          className="movie-details-button"
                          onClick={() =>
                            handleRemoveToWatchedList(`${movie.traktId}`)
                          }
                        >
                          <img
                            className="icon-like"
                            src={addToWatchedImg}
                            alt=""
                          />
                        </button>
                      </>
                    ) : props.watchedList ? (
                      <>
                        <button
                          className="movie-details-button"
                          onClick={() =>
                            handleDeleteFromWatchedList(`${movie.traktId}`)
                          }
                        >
                          <img className="icon-delete" src={deleteImg} alt="" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="movie-details-button"
                          onClick={() =>
                            handleAddToWatchlist(`${movie.traktId}`)
                          }
                        >
                          <img
                            className="icon-watch"
                            src={addToWatchImg}
                            alt=""
                          />
                        </button>
                        <button
                          className="movie-details-button"
                          onClick={() =>
                            handleAddToWatchedList(`${movie.traktId}`)
                          }
                        >
                          <img
                            className="icon-like"
                            src={addToWatchedImg}
                            alt=""
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
