import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import loader from "../img/loader.gif";
import clockIcon from "../img/clock.png";
import starIcon from "../img/star.png";
import { getMovieObject } from '../services/movie';

import "./movie-details-style.css"

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
    actors: [] as any,
    genres: [] as any,
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
    <>
      {isLoading ? 
        <div className="loader">
          <img src={loader} className="loader-gif" alt="loading"/>
        </div> :
        <div className="movie">
          <h1>{movie.title}</h1>
          <div className="movie-details-container">
            <img className="movie-poster" src={"https://image.tmdb.org/t/p/w185/" + movie.poster}/>
            <div className="movie-details">
              <div className="movie-details__runtime">
                <img className="movie-details__clock" src={clockIcon}/> 
                <span>&nbsp;{movie.runtime} min</span>
                <img className="movie-details__star" src={starIcon}/> 
                <span>&nbsp;{movie.popularity}</span>
              </div>
              <div className="movie-details__genres">
                <p className="movie-details__genre grey">Genres:</p>
                {movie.genres.map((genre: string) => {
                  return (
                    <p className="movie-details__genre">
                      {genre}
                    </p>
                  )
                })}
              </div>
              <p className="movie-details__overview p">
                <span className="grey">Overview:</span> 
                &nbsp;{movie.overview}
              </p>
              <p className="movie-details__overview p">
                <span className="grey">Released:</span> 
                &nbsp;{new Intl.DateTimeFormat('en-US').format(new Date(movie.released))}
              </p>
            </div>
          </div>
          <h2 className="movie-cast-title">Cast</h2>
          <div className="actor">
            {movie.actors.map((actor: any )=> {
              return (     
                <div className="actor-details-container">
                  <div className="actor-details">   
                    <img className="actor-details__image" src={"https://image.tmdb.org/t/p/w185/" + actor.image} />
                    <p>{actor.name}</p>
                    <h5>as</h5>
                    <p>{actor.character}</p>
                  </div>     
                </div>
              )
            })}
          </div>
        </div>
      }
    </>
  )
}