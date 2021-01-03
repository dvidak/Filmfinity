import Axios from 'axios';
import { Request, Response } from 'express';
import { AppConfig } from '../config/config';
import { getMovieObject } from '../service/movie.service';
import TmdbService from '../service/Tmdb.service';
import TraktService, { MovieType } from '../service/Trakt.service';
class MovieApiController {
  private tmdbService: TmdbService;
  private traktService: TraktService;

  constructor() {
    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
    this.fetchTraktPopularMovies = this.fetchTraktPopularMovies.bind(this);
    this.fetchTraktTrendingMovies = this.fetchTraktTrendingMovies.bind(this);
    this.fetchById = this.fetchById.bind(this);
    this.fetchByTitle = this.fetchByTitle.bind(this);
  }

  public async fetchTraktPopularMovies(_: Request, res: Response) {
    const traktMovies = await this.traktService.traktMovies(MovieType.POPULAR);
    const movies = [];
    for (const traktMovie of traktMovies) {
      const tmdbId = traktMovie.ids.tmdb;
      let tmdbMovie = await this.tmdbService.fetchTmdbMovie(tmdbId);
      const movieObject = getMovieObject(traktMovie, tmdbMovie);
      movies.push(movieObject);
    }

    res.status(200).json(movies);
  }

  public async fetchTraktTrendingMovies(_: Request, res: Response) {
    const traktMovies = await this.traktService.traktMovies(MovieType.TRENDING);
    const movies = [];
    for (const traktMovie of traktMovies) {
      const tmdbId = traktMovie.movie.ids.tmdb;
      let tmdbMovie = await this.tmdbService.fetchTmdbMovie(tmdbId);
      const movieObject = getMovieObject(traktMovie, tmdbMovie);
      movies.push(movieObject);
    }
    res.status(200).json(movies);
  }

  public async fetchById(req: Request, res: Response) {
    const movie = await this.traktService.searchTraktMovieById(req.params.id);
    res.status(200).json(movie);
  }

  public async fetchByTitle(req: Request, res: Response) {
    const movies = await this.traktService.searchTraktMovieByTitle(req.params.title);
    res.status(200).json(movies);
  }

  //TMDB trending and popular is not used
  public async fetchTmdbTrendingMovies(_: Request, res: Response) {
    const tmdbMovies = await Axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${AppConfig.TMDB.API_KEY}`
    );
    res.status(200).json(tmdbMovies.data.results);
  }

  public async fetchTmdbPopularMovies(_: Request, res: Response) {
    const tmdbMovies = await Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${AppConfig.TMDB.API_KEY}&language=en-US`
    );
    res.status(200).json(tmdbMovies.data.results);
  }
}

export = new MovieApiController();
