import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header, Navbar } from '.';
import loader from "../img/loader.gif";
import { getMovieObject } from '../services/movie';

type TParams = { id: string };

export function Movie({ match }: RouteComponentProps<TParams>) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({
    released: "",
    title: "",
    originalTitle: "",
    overview: "",
    runtime: 0,
    country: "",
    trailer: "",
    homepage: "",
    popularity: 0,
    poster: "",
    actors: [],
    genres: [],
    traktId: "",
    coeff: 0
  });
  
  useEffect(() => {
    getMovieObject(match.params.id).then(movie => {
      //movie.ids.imdb
      setMovie(movie);
      console.log("Movie ", movie)
      setIsLoading(false);
    });
  }, [match.params.id]);

  return (
    <div className="home-wrapper">
      <Header />
      <div className="movies-wrapper">
        <Navbar />
        <div className="movie-list">
          {isLoading ? 
            <div className="loader">
              <img src={loader} className="loader-gif" alt="loading"/>
            </div> :
            <h3>{movie.title}</h3>
          }
        </div>
      </div>
    </div>
  )
}