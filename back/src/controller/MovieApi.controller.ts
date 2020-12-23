import Axios from 'axios'
import { Request, Response } from 'express'
import { AppConfig } from '../config/config'

const Trakt = require('trakt.tv')
class MovieApiController {
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

  // TODO: when to use trakt?
  async fetchPopularTraktMovies() {
    const trakt = new Trakt(
      {
        client_id: AppConfig.TRAKT.CLIENT_ID,
        client_secret: AppConfig.TRAKT.CLIENT_SECRET,
      },
      true
    )

    return await trakt.movies.popular()
  }
}

export = new MovieApiController()
