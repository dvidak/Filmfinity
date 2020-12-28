import * as React from "react";

import addToWatchImg from "../img/addToWatch.png";
import addToWatchedImg from "../img/addToWatched.png";
import { Movie } from "../models/Movie";

interface Props {
  title: string;
  movies: Movie[];
}

export function Movies(props: Props) {
  const posterUrl = "https://image.tmdb.org/t/p/w185/";

  return (
    <>
      <h2 className="listName">Popular movies</h2>
      <div className="movies">
        {props.movies.length > 0 &&
          props.movies.map((movie: Movie) => {
            return (
              <div className="imgContainer">
                <img
                  src={posterUrl + movie.poster}
                  className="moviePoster"
                  alt={movie.title}
                  key={movie.popularity}
                />
                <div className="movieDetails">
                  <h4 className="title">{movie.title}</h4>
                  <div className="addButtons">
                    <button className="addBtn">
                      <img className="iconWatch" src={addToWatchImg} alt="" />
                    </button>
                    <button className="addBtn">
                      <img className="iconLike" src={addToWatchedImg} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
