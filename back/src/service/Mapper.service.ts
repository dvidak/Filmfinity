import { FbLikedMovieInterface } from '../model/FbLikedMovie';
import TraktService from './Trakt.service';

class MapperService {
  private traktService: TraktService;

  constructor() {
    this.traktService = new TraktService();
  }

  /**
   * Method maps Facebook liked movie to MovieInterface object.
   */
  async mapFbLikedMovie(fbLikedMovie: FbLikedMovieInterface) {
    console.log('Mapping fb liked movie', fbLikedMovie);
    let equalYear = false;

    const traktMovies = await this.traktService.searchTraktMovieByTitle(fbLikedMovie.name);

    // Analyize all movies
    for (const traktMovie of traktMovies) {
      if (fbLikedMovie.birthday && traktMovie.movie.year === fbLikedMovie.birthday) {
        // Trakt movie with the same year has been found
        console.log(traktMovie);
        return traktMovie;
      }
    }

    // No year has been found. Take 1st result.
    return traktMovies[0];
  }
}

export default MapperService;
