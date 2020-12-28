import { Router } from 'express'
import MovieApiController from '../controller/MovieApi.controller'

class MovieApiRouter {
  private _router = Router()
  private controller = MovieApiController

  get router() {
    return this._router
  }

  constructor() {
    this.configure()
  }

  private configure() {
    this._router.get('/popular', this.controller.fetchTraktPopularMovies)
    this._router.get('/trending', this.controller.fetchTraktTrendingMovies)
    this._router.get('/tmdb/trending', this.controller.fetchTmdbTrendingMovies)
    this._router.get('tmdb/popular', this.controller.fetchTmdbPopularMovies)
  }
}

export = new MovieApiRouter().router
