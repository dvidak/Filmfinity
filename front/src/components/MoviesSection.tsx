import React, { SetStateAction, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  fbLiked?: boolean;
  setMovies?: (prevState: Movie[] | undefined) => void;
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
    if (props.setMovies && props.movies) {
      let movies = [...props.movies];
      const movieIndex = props.movies?.findIndex(movie => movie.traktId === movieId);
      movies[movieIndex] = {...movies[movieIndex], isOnWatchlist: true};
      props.setMovies(movies);
    }
  };

  const handleDeleteFromWatchlist = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId);
    if (props.setMovies)
      props.setMovies(
        props.movies?.filter((movie) => movie.traktId !== movieId)
      );
  };

  const handleAddToWatchedList = (movieId: string) => {
    addToWatchedList(userId as string, movieId);
    if (props.setMovies && props.movies) {
      let movies = [...props.movies];
      const movieIndex = props.movies?.findIndex(movie => movie.traktId === movieId);
      movies[movieIndex] = {...movies[movieIndex], isOnWatchedList: true};
      props.setMovies(movies);
    }
  };

  const handleDeleteFromWatchedList = (movieId: string) => {
    deleteFromWatchedList(userId as string, movieId);
    if (props.setMovies)
      props.setMovies(
        props.movies?.filter((movie) => movie.traktId !== movieId)
      );
  };

  const handleMoveToWatchedList = (movieId: string) => {
    deleteFromWatchlist(userId as string, movieId);
    if (props.setMovies)
      props.setMovies(
        props.movies?.filter((movie) => movie.traktId !== movieId)
      );
    addToWatchedList(userId as string, movieId);
  };

  return (
    <div className="movies-section">
      <h2 className="movies-section__title">{props.title}</h2>
      <div className="movies-section__list">
        {props.movies !== undefined && props.movies.length === 0 ? (
          <div className="no-movies">No movies.</div>
        ) : props.movies !== undefined && props.movies.length > 0 ? (
          props.movies.map((movie: Movie) => {
            return (
              <>
                {movie.poster && 
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
                        !props.fbLiked &&
                        !movie.isOnWatchlist &&
                        !movie.isOnWatchedList && (
                          <button
                            className="watchlist"
                            onClick={() => {
                              movie.isOnWatchlist = true;
                              handleAddToWatchlist(`${movie.traktId}`);
                            }}
                          />
                        )}
                      {!props.watchedList &&
                        !props.fbLiked &&
                        !movie.isOnWatchedList && 
                        !movie.isOnWatchlist && (
                          <button
                            className="watched-list"
                            onClick={() => {
                              movie.isOnWatchedList = true;
                              props.watchlist ? 
                                handleMoveToWatchedList(`${movie.traktId}`) : 
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
                </div>}
              </>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
