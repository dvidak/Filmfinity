import { MovieInterface } from '../model/Movie';
import User from '../model/User';
import { TastediveType } from '../types/Tastediv.type';
import { TraktType } from '../types/Trakt.type';
import MapperService from './Mapper.service';
import MovieService from './Movie.service';
import TastediveService from './Tastedive.service';
import TraktService from './Trakt.service';

class RecommendationService {
  private traktService: TraktService;
  private tastediveService: TastediveService;
  private mapperService: MapperService;
  private movieService: MovieService;

  constructor() {
    this.traktService = new TraktService();
    this.tastediveService = new TastediveService();
    this.mapperService = new MapperService();
    this.movieService = new MovieService();
  }

  async generateUserRecommendations(facebookId: string) {
    console.log('[RecommendationService] Generating user recommendations...');
    const user = await User.findOne({ facebookId: facebookId });
    if (!user) return;
    let recommendations: MovieInterface[] = [];

    // Look at all liked movies and get recommendations for all of them
    console.log('[RecommendationService] Generating Facebook recommendations...');
    const fbCoeff = 1.8;
    for (const single of user.mappedFbLikedMovies) {
      const singleMovieRecommendations = await this.getRecommendations(single.title, single.traktId, fbCoeff);
      recommendations = [...recommendations, ...singleMovieRecommendations];
    }

    // Look at the watchlist and get recommendations for all of them
    console.log('[RecommendationService] Generating watchlist recommendations...');
    const watchlistCoeff = 1.5;
    // TODO

    // Look at the watched list and get recommendations for all of them
    console.log('[RecommendationService] Generating watched list recommendations...');
    const watchedListCoeff = 1.2;
    // TODO

    // Remove duplicate movies
    console.log('[RecommendationService] Removing duplicated movies from recommendations...');
    // TODO

    // Sort movies by coeff
    console.log('[RecommendationService] Sorting movies by coefficient...');
    recommendations.sort((a, b) => b.coeff - a.coeff);
    // TODO

    console.log('ALL RECOMMENDATIONS--------------------------');
    console.log(recommendations);
  }

  async getRecommendations(movieName: string, traktId: string, coeff: number = 1) {
    // Get raw recommendations
    const traktRecs = (await this.traktService.getRelatedTraktMovies(traktId)) as TraktType[];
    const tastediveRecs = (await this.tastediveService.getRecommendations(movieName)).Similar
      .Results as TastediveType[];

    const finalRecommendations: MovieInterface[] = [];

    for (const traktRec of traktRecs) {
      const idx = tastediveRecs.findIndex((tastediveRec) => tastediveRec.Name === traktRec.title);
      if (idx >= 0) {
        // Same movie is in Trakt and in Tastedive recommendations -> multiply it's importance
        const movObj = await this.movieService.getMovieObject(traktRec.ids.trakt, traktRec.ids.tmdb);
        finalRecommendations.push({ ...movObj, coeff: coeff * 2 });
      } else {
        // Movie appears only in Trakt
        const movObj = await this.movieService.getMovieObject(traktRec.ids.trakt, traktRec.ids.tmdb);
        finalRecommendations.push({ ...movObj, coeff });
      }
    }

    return finalRecommendations;
  }
}

export default RecommendationService;
