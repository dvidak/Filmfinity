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
    true
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

  public async traktMovies(type: MovieType) {
    if (type === MovieType.POPULAR) {
      return await this.trakt.movies.popular();
    } else {
      return await this.trakt.movies.trending();
    }
  }
}

export default TraktService;
