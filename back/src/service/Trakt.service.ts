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
  public async searchTraktMovieById(id: string, type: string = 'trakt') {
    try {
      return await this.trakt.search.id({
        id_type: type,
        id: id,
        type: 'movie',
      });
    } catch (error) {
      console.log('TraktService Error', error);
    }
  }

  public async searchTraktMovieByTitle(title: string) {
    try {
      return await this.trakt.search.text({
        type: 'movie',
        query: title,
      });
    } catch (error) {
      console.log('TraktService Error', error);
    }
  }

  /**
   * Method returns top 10 related movies
   */
  public async getRelatedTraktMovies(traktId: string) {
    try {
      return await this.trakt.movies.related({
        id: traktId,
      });
    } catch (error) {
      console.log('TraktService Error', error);
    }
  }

  public async getMovieCredits(actorId: string) {
    try {
      return await this.trakt.people.movies({
        id: actorId,
      });
    } catch (error) {
      console.log('TraktService Error', error);
    }
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
