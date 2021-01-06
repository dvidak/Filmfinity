import React, { SetStateAction, useEffect } from "react";
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
import { Loader } from "./Loader";

import "./movies-section-style.css";

interface Props {
  title: string;
  movies: Movie[] | undefined;
  watchlist?: boolean;
  watchedList?: boolean;
  setWatchlist?: (prevState: Movie[] | undefined) => void;
  setWatchedList?: (prevState: Movie[] | undefined) => void;
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
    if (props.setWatchlist)
      props.setWatchlist(
        props.movies?.filter((movie) => movie.traktId !== movieId)
      );
  };

  const handleAddToWatchedList = (movieId: string) => {
    addToWatchedList(userId as string, movieId);
  };

  const handleDeleteFromWatchedList = (movieId: string) => {
    deleteFromWatchedList(userId as string, movieId);
    if (props.setWatchedList)
      props.setWatchedList(
        props.movies?.filter((movie) => movie.traktId !== movieId)
      );
  };

  const handleRemoveToWatchedList = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId);
    if (props.setWatchlist)
      props.setWatchlist(
        props.movies?.filter((movie) => movie.traktId !== movieId)
      );
    addToWatchedList(userId as string, movieId);
  };

  useEffect(() => {}, [props.movies]);

  return (
    <div className="movies-section">
      <h2 className="movies-section__title">{props.title}</h2>
      <div className="movies-section__list">
        {props.movies !== undefined && props.movies.length === 0 ? (
          <div className="no-movies">No movies.</div>
        ) : props.movies !== undefined && props.movies.length > 0 ? (
          props.movies.map((movie: Movie) => {
            return (
              <div
                className="movie-thumbnail"
                key={movie.title}
                style={{
                  backgroundImage: `url('${posterUrl + movie.poster}')`,
                }}
              >
                <div className="movie-thumbnail__details">
                  <h4 onClick={() => routeChange(movie.traktId)}>
                    {movie.title}
                    {movie.isOnWatchedList}
                    {movie.isOnWatchlist}
                  </h4>
                  <div className="movie-thumbnail__details__buttons">
                    {!props.watchedList &&
                      !props.watchlist &&
                      !movie.isOnWatchlist && (
                        <button
                          className="watchlist"
                          onClick={() => {
                            movie.isOnWatchlist = true;
                            handleAddToWatchlist(`${movie.traktId}`);
                          }}
                        />
                      )}
                    {!props.watchedList &&
                      !props.watchlist &&
                      !movie.isOnWatchedList && (
                        <button
                          className="watched-list"
                          onClick={() => {
                            movie.isOnWatchedList = true;
                            handleAddToWatchedList(`${movie.traktId}`);
                          }}
                        />
                      )}
                    {(props.watchedList || props.watchlist) && (
                      <button
                        className="delete"
                        onClick={() => {
                          if (props.watchlist) {
                            handleDeleteFromWatchlist(`${movie.traktId}`);
                          } else if (props.watchedList) {
                            handleDeleteFromWatchedList(`${movie.traktId}`);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
