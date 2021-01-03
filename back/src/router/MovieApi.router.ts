import { Router } from 'express';
import MovieApiController from '../controller/MovieApi.controller';

class MovieApiRouter {
  private _router = Router();
  private controller = MovieApiController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('/popular', this.controller.fetchTraktPopularMovies);
    this._router.get('/trending', this.controller.fetchTraktTrendingMovies);
    this._router.get('/tmdb/trending', this.controller.fetchTmdbTrendingMovies);
    this._router.get('/tmdb/popular', this.controller.fetchTmdbPopularMovies);

    // Usage of trakt service
    this._router.get('/trakt/:id', this.controller.fetchById);
    this._router.get('/trakt/query/:title', this.controller.fetchByTitle);
  }
}

export = new MovieApiRouter().router;
