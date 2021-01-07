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
        console.log(`TMDb movie ${tmdbId} not found.`);
      }
    }
  }

  public async getRecommendations(tmbdId: string) {
    try {
      return await Axios.get(
        `https://api.themoviedb.org/3/movie/${tmbdId}/recommendations?api_key=${AppConfig.TMDB.API_KEY}`
      ).then((response) => response.data.results);
    } catch {
      console.log(`TMDb movie ${tmbdId} recommendations not found.`);
    }
  }
}

export default TmdbService;
