import { FbLikedMovieInterface } from '../model/FbLikedMovie';
import MovieService from './Movie.service';
import TraktService from './Trakt.service';

class MapperService {
  private traktService: TraktService;
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
    this.traktService = new TraktService();
  }

  /**
   * Method maps Facebook liked movie to MovieInterface object.
   */
  async mapFbLikedMovie(fbLikedMovie: FbLikedMovieInterface) {
    console.log('Mapping fb liked movie', fbLikedMovie);
    let found;

    const traktMovies = await this.traktService.searchTraktMovieByTitle(fbLikedMovie.name);

    // Analyize all movies
    for (const traktMovie of traktMovies) {
      if (fbLikedMovie.birthday && traktMovie.movie.year === fbLikedMovie.birthday) {
        // Trakt movie with the same year has been found
        found = traktMovie;
      }
    }

    // No year has been found. Take 1st result.
    if (!found) found = traktMovies[0];

    const traktId = found.movie.ids.trakt;
    const tmdbId = found.movie.ids.tmdb;
    const mapped = await this.movieService.getMovieObject(traktId, tmdbId);

    return mapped;
  }
}

export default MapperService;
