import Axios from 'axios'
import { Request, Response } from 'express'
import { AppConfig } from '../config/config'
import { fetchTmdbMovie, getMovieObject } from '../service/movie.service'

const Trakt = require('trakt.tv')

enum MovieType {
  POPULAR = 'POPULAR',
  TRENDING = 'TRENDING',
}

class MovieApiController {
  constructor() {
    this.fetchTraktPopularMovies = this.fetchTraktPopularMovies.bind(this)
    this.fetchTraktTrendingMovies = this.fetchTraktTrendingMovies.bind(this)
  }

  public async fetchTraktPopularMovies(_: Request, res: Response) {
    const traktMovies = await this.traktMovies(MovieType.POPULAR)
    const movies = []
    for (const traktMovie of traktMovies) {
      const tmdbId = traktMovie.ids.tmdb
      let tmdbMovie = await fetchTmdbMovie(tmdbId)
      const movieObject = getMovieObject(traktMovie, tmdbMovie)
      movies.push(movieObject)
    }
    res.status(200).json(movies)
  }

  public async fetchTraktTrendingMovies(_: Request, res: Response) {
    const traktMovies = await this.traktMovies(MovieType.TRENDING)
    const movies = []
    for (const traktMovie of traktMovies) {
      const tmdbId = traktMovie.movie.ids.tmdb
      let tmdbMovie = await fetchTmdbMovie(tmdbId)
      const movieObject = getMovieObject(traktMovie, tmdbMovie)
      movies.push(movieObject)
    }
    res.status(200).json(movies)
  }

  //TMDB trending and popular is not used
  public async fetchTmdbTrendingMovies(_: Request, res: Response) {
    const tmdbMovies = await Axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${AppConfig.TMDB.API_KEY}`
    )
    res.status(200).json(tmdbMovies.data.results)
  }

  public async fetchTmdbPopularMovies(_: Request, res: Response) {
    const tmdbMovies = await Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${AppConfig.TMDB.API_KEY}&language=en-US`
    )
    res.status(200).json(tmdbMovies.data.results)
  }

  private async traktMovies(type: MovieType) {
    const trakt = new Trakt(
      {
        client_id: AppConfig.TRAKT.CLIENT_ID,
        client_secret: AppConfig.TRAKT.CLIENT_SECRET,
      },
      true
    )

    if (type === MovieType.POPULAR) {
      return await trakt.movies.popular()
    } else {
      return await trakt.movies.trending()
    }
  }
}

export = new MovieApiController()
