import MovieApiController from '../controller/MovieApi.controller';
import { MovieInterface } from '../model/Movie';
import User from '../model/User';
import { TastediveType } from '../types/Tastediv.type';
import { TraktType } from '../types/Trakt.type';
import MapperService from './Mapper.service';
import MovieService from './Movie.service';
import TastediveService from './Tastedive.service';
import TraktService from './Trakt.service';
import UsersService from './Users.service';

class RecommendationService {
  private usersService: UsersService;
  private traktService: TraktService;
  private tastediveService: TastediveService;
  private mapperService: MapperService;
  private movieService: MovieService;

  constructor() {
    this.usersService = new UsersService();
    this.traktService = new TraktService();
    this.tastediveService = new TastediveService();
    this.mapperService = new MapperService();
    this.movieService = new MovieService();
  }

  async generateUserRecommendations(userFacebookId: string) {
    console.log('[RecommendationService] Generating user recommendations...');
    const user = await this.usersService.findUser(userFacebookId);
    let recommendations: MovieInterface[] = [];

    // Look at all liked movies and get recommendations for all of them
    console.log('[RecommendationService] Generating Facebook recommendations...');
    let facebookRecommendations = await this.getRecommendationsForMovieArray(user.mappedFbLikedMovies, 1.8);
    recommendations = [...recommendations, ...facebookRecommendations];
    await User.updateOne({ facebookId: userFacebookId }, { facebookRecommendations });

    // Look at genres
    console.log('[RecommendationService] Generating genres recommendations...');
    const genres = await this.usersService.getAllUserGenres(userFacebookId);
    const genresRecommendations = await this.getGenresRecommendations(genres);
    await User.updateOne({ facebookId: userFacebookId }, { genresRecommendations });

    // Look at the watchlist and get recommendations for all of them
    console.log('[RecommendationService] Generating watchlist recommendations...');
    let watchlistRecommendations = await this.getRecommendationsForMovieArray(user.watchlist, 1.5);
    recommendations = [...recommendations, ...watchlistRecommendations];

    // Look at the watched list and get recommendations for all of them
    console.log('[RecommendationService] Generating watched list recommendations...');
    let watchedListRecommendations = await this.getRecommendationsForMovieArray(user.watchedList, 1.5);
    recommendations = [...recommendations, ...watchedListRecommendations];

    // Remove duplicate movies and prioritize
    console.log('[RecommendationService] Removing duplicated movies from recommendations...');
    recommendations = this.prioritizeRecommendations(recommendations);

    // Sort movies by coeff
    console.log('[RecommendationService] Sorting movies by coefficient...');
    recommendations.sort((a, b) => b.coeff - a.coeff);

    console.log('ALL RECOMMENDATIONS--------------------------');
    console.log(recommendations);
    await User.updateOne({ facebookId: userFacebookId }, { recommendations });
  }

  prioritizeRecommendations(movies: MovieInterface[]): MovieInterface[] {
    let finalRecs: MovieInterface[] = movies.sort(function(a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
  });
    for (let i = 0; i < finalRecs.length - 1; i++) {
      if (finalRecs[i+1].title == finalRecs[i].title) {
        // Remove movie with bigger index and multiply coef by 2
        movies.splice(i+1, 1)
        movies[i].coeff *= 2;
      }
    }
    return movies;
  }

  async getGenresRecommendations(genres: string[]) {
    console.log('GETTING GENRE RECOMMENDATIONS', genres);

    // TODO
    // TODO
    // TODO

    return [];
  }

  /**
   * Function returns movie recommendations for a specific array of movies.
   * @param movies Array of movies (MovieInterface objects)
   * @param coeff Coefficient of importance, default 1
   */
  async getRecommendationsForMovieArray(movies: MovieInterface[], coeff = 1): Promise<MovieInterface[]> {
    let finalRecommendations: MovieInterface[] = [];
    for (const movie of movies) {
      const movieRecommendations = await this.getRecommendations(movie.title, movie.traktId, coeff);
      finalRecommendations = [...finalRecommendations, ...movieRecommendations];
    }
    return finalRecommendations;
  }

  /**
   * Function returns movie recommendations based on specific movie.
   * @param movieName Name of the movie (used for Tastedive search)
   * @param traktId Trakt ID of the movie
   * @param coeff Coefficient of importance, default 1
   */
  async getRecommendations(movieName: string, traktId: string, coeff: number = 1): Promise<MovieInterface[]> {
    // Get raw recommendations
    const traktRecs = (await this.traktService.getRelatedTraktMovies(traktId)) as TraktType[];
    const tastediveRecs = (await this.tastediveService.getRecommendations(movieName)).Similar
      .Results as TastediveType[];
    const traktActorsRecs = await this.getRecommendationsBasedOnActors(traktId);

    const finalRecommendations: MovieInterface[] = [];

    // Compare Trakt and Tastedive recommendations - if there is the same movie, multiply it's coeff by 2
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

    // Compare final recommendations with recommendations based on actors - if there is the same movie, multiply it's coeff by 2
    for (let i = 0; i < finalRecommendations.length; i++) {
      const idx = traktActorsRecs.findIndex((actorRec) => actorRec.title === finalRecommendations[i].title);
      if (idx >= 0) {
        finalRecommendations[i].coeff *= 2;
        console.log('FOUND ONE SAME!!!');
      }
    }

    return finalRecommendations;
  }

  // From popular actors of some movie return list of actor popular movies
  async getRecommendationsBasedOnActors(traktId: string) {
    const traktMovie = await this.traktService.searchTraktMovieById(traktId, 'trakt');
    const movieObject = (await this.movieService.getMovieObject(
      traktId,
      traktMovie[0].movie.ids.tmdb
    )) as MovieInterface;

    let traktActorMovieRecomendation: MovieInterface[] = [];
    const actorIds = movieObject.actors.map((actor) => actor.id);

    for (let actorId of actorIds) {
      const movieCreditsObject = await this.traktService.getMovieCredits(actorId);
      const movieFromCredits = movieCreditsObject.cast.map((element: { movie: any }) => element.movie);
      for (let movie of movieFromCredits) {
        const movieObject: MovieInterface = await this.movieService.getMovieObject(movie.ids.trakt, movie.ids.tmdb);
        traktActorMovieRecomendation.push(movieObject);
      }
    }
    return traktActorMovieRecomendation;
  }
}

export default RecommendationService;
