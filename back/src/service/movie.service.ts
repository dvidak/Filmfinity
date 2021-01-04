import User from '../model/User';
import TmdbService from './Tmdb.service';
import TraktService from './Trakt.service';

class MovieService {
  private tmdbService: TmdbService;
  private traktService: TraktService;

  constructor() {
    this.tmdbService = new TmdbService();
    this.traktService = new TraktService();
  }

  async getMovieObject(traktId: string, tmdbId: string) {
    let traktMovie: any = {};
    let tmdbMovie: any = {};

    if (traktId) traktMovie = ((await this.traktService.searchTraktMovieById(traktId, 'trakt')) as any)[0];
    if (tmdbId) tmdbMovie = await this.tmdbService.fetchTmdbMovie(tmdbId);

    return this.serializeMovieObject(traktMovie.movie, tmdbMovie);
  }

  public serializeMovieObject(traktMovie: any, tmdbMovie: any) {
    let movieObject: any;
    console.log("trakt movie ", traktMovie)
    if (tmdbMovie) {
      movieObject = {
        released: tmdbMovie.release_date || traktMovie.released,
        title: tmdbMovie.title || traktMovie.title,
        originalTitle: tmdbMovie.original_title,
        overview: traktMovie.overview || tmdbMovie.overview,
        runtime: tmdbMovie.runtime,
        country: traktMovie.country,
        trailer: traktMovie.trailer,
        homepage: traktMovie.homepage || tmdbMovie.homepage,
        popularity: tmdbMovie.popularity,
        poster: tmdbMovie.poster_path,
        tmdb: tmdbMovie.id,
        traktId: Array.isArray(traktMovie) ? (traktMovie[0].movie ? traktMovie[0].movie.ids.trakt : traktMovie[0].ids.trakt) : (traktMovie.movie ? traktMovie.movie.ids.trakt : traktMovie.ids.trakt)
      };
    } else {
      movieObject = traktMovie;
    }
    return movieObject;
  }
}

export default MovieService;
