import { AppConfig } from '../config/config';

export enum MovieType {
  POPULAR = 'POPULAR',
  TRENDING = 'TRENDING',
}
const Trakt = require('trakt.tv');
class TraktService {
  private trakt = new Trakt(
    {
      client_id: AppConfig.TRAKT.CLIENT_ID,
      client_secret: AppConfig.TRAKT.CLIENT_SECRET,
    },
    false
  );

  // id can be Trakt ID, Trakt slug, or IMDB ID
  // id_type to lookup = trakt , imdb , tmdb , tvdb .
  public async searchTraktMovieById(id: string, type: string = 'imdb') {
    return await this.trakt.search.id({
      id_type: type,
      id: id,
      type: 'movie',
    });
  }

  public async searchTraktMovieByTitle(title: string) {
    return await this.trakt.search.text({
      type: 'movie',
      query: title,
    });
  }

  /**
   * Method returns top 10 related movies
   */
  public async getRelatedTraktMovies(traktId: string) {
    return await this.trakt.movies.related({
      id: traktId,
    });
  }

  public async getMovieCredits(actorId: string) {
    return await this.trakt.people.movies({
      id: actorId,
    });
  }

  public async traktMovies(type: MovieType) {
    if (type === MovieType.POPULAR) {
      return await this.trakt.movies.popular();
    } else {
      return await this.trakt.movies.trending();
    }
  }
}

export default TraktService;
