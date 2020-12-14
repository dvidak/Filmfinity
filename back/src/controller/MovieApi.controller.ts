import Axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import Movie from '../model/Movie';

const Trakt = require('trakt.tv');
const omdb = new (require('omdbapi'))('ea93e181');
const APP_KEY = '07dd47224b2ca2be1a669914588f4278';

type TmdbMovieType = {
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  popularity: number;
};

class MovieApiController {
  constructor() {
    this.load = this.load.bind(this);
  }

  public async load(req: Request, res: Response) {
    const traktMovies = await this.fetchTraktMovies();
    console.log('length' + traktMovies.length);
    let i = 0;
    for (const traktMovie of traktMovies) {
      const tmdbId = traktMovie.movie.ids.tmdb;
      const omdbId = traktMovie.movie.ids.imdb;
      let tmdbMovie = await this.fetchTmdbMovie(tmdbId);
      let omdbMovie = await this.fetchOmdbMovie(omdbId);

      if (tmdbMovie && omdbMovie) {
        i++;
        let movieObject = {
          released:
            tmdbMovie.release_date || traktMovie.released || omdbMovie.released,
          title: traktMovie.movie.title || tmdbMovie.title,
          originalTitle: tmdbMovie.original_title,
          overview: traktMovie.overview || omdbMovie.plot || tmdbMovie.overview,
          runtime: omdbMovie.runtime || tmdbMovie.runtime,
          country: traktMovie.country || omdbMovie.country,
          trailer: traktMovie.trailer,
          homepage:
            traktMovie.homepage || omdbMovie.website || tmdbMovie.homepage,
          popularity: omdbMovie.imdbrating || tmdbMovie.popularity,
          poster: omdbMovie.poster || tmdbMovie.poster_path,
          genres: Object.values(omdbMovie.genre),
          writer: Object.values(omdbMovie.writer),
          actors: Object.values(omdbMovie.actors),
        };

        const newMovie = new Movie(movieObject);
        newMovie.save();
      }
    }

    console.log(i);
    res.status(200).json({ message: 'Database loaded' });
  }

  async fetchTraktMovies() {
    const trakt = new Trakt(
      {
        client_id:
          '868d27dfe699bcf5553fe7b83cd55192eba4c8550469d9cb0f2f5a83727d486c',
        client_secret:
          'a2ff175151c08bcaa93a2536b7ec795e80bad70bbbe797f5e2980b611c99a579',
      },
      true
    );

    return await trakt.calendars.all.movies({
      start_date: '2000-01-01',
      days: '7',
      extended: 'full',
    });
  }

  async fetchTmdbMovie(tmdbId: string) {
    if (tmdbId) {
      try {
        return await Axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${APP_KEY}`
        ).then((movie) => movie.data);
      } catch {
        console.log('cach and continue tmdb');
      }
    }
  }

  // OMDB API 1000 req per day
  async fetchOmdbMovie(omdbId: string) {
    if (omdbId) {
      try {
        return await omdb.get({
          id: omdbId,
        });
      } catch {
        console.log('cach and continue omdbId');
      }
    }
  }
}

export = new MovieApiController();
