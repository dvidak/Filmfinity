import Axios from 'axios';
import { AppConfig } from '../config/config';

class TmdbService {
  public async fetchTmdbMovie(tmdbId: string) {
    if (tmdbId) {
      try {
        return await Axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${AppConfig.TMDB.API_KEY}&append_to_response=credits`
        ).then((movie) => movie.data);
      } catch {
        console.log('catch and continue tmdb');
      }
    }
  }
}

export default TmdbService;
