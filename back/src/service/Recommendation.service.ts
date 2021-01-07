import { MovieInterface } from '../model/Movie';
import User, { UserInterface } from '../model/User';
import { TastediveType } from '../types/Tastediv.type';
import { TraktType } from '../types/Trakt.type';
import MovieService from './Movie.service';
import TastediveService from './Tastedive.service';
import TmdbService from './Tmdb.service';
import TraktService from './Trakt.service';
import UsersService from './Users.service';

class RecommendationService {
  private usersService: UsersService;
  private traktService: TraktService;
  private tastediveService: TastediveService;
  private movieService: MovieService;
  private tmdbService: TmdbService;

  constructor() {
    this.usersService = new UsersService();
    this.traktService = new TraktService();
    this.tastediveService = new TastediveService();
    this.movieService = new MovieService();
    this.tmdbService = new TmdbService();
  }

  async generateUserFacebookRecommendations(userFacebookId: string) {
    const user = await this.usersService.findUser(userFacebookId);
    // Look at all liked movies and get recommendations for all of them
    console.log('[RecommendationService] Generating Facebook recommendations...');
    let recommendations = await this.getRecommendationsForMovieArray(user.mappedFbLikedMovies, 1.8);
    recommendations = await this.getGenresRecommendations(recommendations);
    await User.updateOne({ facebookId: userFacebookId }, { facebookRecommendations: recommendations });
    return recommendations;
  }

  async generateUserWatchlistRecommendations(userFacebookId: string) {
    const user = await this.usersService.findUser(userFacebookId);
    console.log('[RecommendationService] Generating watchlist recommendations...');
    let recommendations = await this.getRecommendationsForMovieArray(user.watchlist, 1.5);
    await User.updateOne({ facebookId: userFacebookId }, { watchlistRecommendations: recommendations });
    return recommendations;
  }

  async generateUserWatchedListRecommendations(userFacebookId: string) {
    const user = await this.usersService.findUser(userFacebookId);
    console.log('[RecommendationService] Generating watched list recommendations...');
    let recommendations = await this.getRecommendationsForMovieArray(user.watchedList, 1.5);
    await User.updateOne({ facebookId: userFacebookId }, { watchedListRecommendations: recommendations });
    return recommendations;
  }

  async generateUserRecommendations(userFacebookId: string) {
    console.log('[RecommendationService] Generating user recommendations...');
    const user = await this.usersService.findUser(userFacebookId);
    let recommendations: MovieInterface[] = [];

    recommendations = user.facebookRecommendations;
    recommendations = [...recommendations, ...user.watchlistRecommendations];
    recommendations = [...recommendations, ...user.watchedListRecommendations];

    // Remove duplicate movies and prioritize
    console.log('[RecommendationService] Removing duplicated movies from recommendations...');
    recommendations = this.prioritizeRecommendations(recommendations);

    console.log('[RecommendationService] Update coef based on user genre fb preference...');
    recommendations = await this.getGenresRecommendations(recommendations);

    // Mark watched movies and movies on watchlist
    console.log('[RecommendationService] Marking watchlist and watched movies...');
    recommendations = this.filterRecommendations(user, recommendations);

    // console.log('RECOMMENDATIONS ', recommendations);

    await User.updateOne({ facebookId: userFacebookId }, { recommendations });
  }

  /**
   * @param user User
   * @param recommendations Array of recommended movies
   */
  filterRecommendations(user: UserInterface, recommendations: MovieInterface[]) {
    for (let i = 0; i < recommendations.length; i++) {
      const watchedList = user.watchedList.findIndex((movie) => movie.title === recommendations[i].title);
      const watchlist = user.watchlist.findIndex((movie) => movie.title === recommendations[i].title);
      (recommendations[i] as any).isOnWatchedList = watchedList >= 0 ? true : false;
      (recommendations[i] as any).isOnWatchlist = watchlist >= 0 ? true : false;
    }

    let sortedRecommendations: MovieInterface[] = recommendations.sort(function (a, b) {
      return b.coeff - a.coeff;
    });
    recommendations = sortedRecommendations.slice(0, 20);
    return recommendations;
  }

  prioritizeRecommendations(movies: MovieInterface[]): MovieInterface[] {
    let finalRecs: MovieInterface[] = movies.sort(function (a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });
    for (let i = 0; i < finalRecs.length - 1; i++) {
      if (finalRecs[i + 1].title == finalRecs[i].title) {
        // Remove movie with bigger index and multiply coef by 2
        movies.splice(i + 1, 1);
        movies[i].coeff *= 2;
      }
    }
    return movies;
  }

  /**
   * Function returns movie recommendations for a specific array of movies based on genre preferences.
   * @param movies Array of movies (MovieInterface objects)
   * @param coeff Coefficient of importance, default 1
   */
  async getGenresRecommendations(movies: MovieInterface[], coef: number = 1): Promise<MovieInterface[]> {
    const genres = await this.usersService.getUserGenreCount('3531360170284223');
    return movies.map((movie) => {
      const movieGenreCoef = movie.genres
        .map((genre) => {
          return genres.has(genre) ? genres.get(genre) : -1;
        })
        .reduce((prev, curr) => prev + curr);
      movie.coeff += movieGenreCoef * coef;
      return movie;
    });
  }

  /**
   * Function returns movie recommendations for a specific array of movies.
   * @param movies Array of movies (MovieInterface objects)
   * @param coeff Coefficient of importance, default 1
   */
  async getRecommendationsForMovieArray(movies: MovieInterface[], coeff = 1): Promise<MovieInterface[]> {
    let finalRecommendations: MovieInterface[] = [];
    for (const movie of movies) {
      const movieRecommendations = await this.getRecommendations(movie.title, movie.traktId, movie.tmdbId, coeff);
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
  async getRecommendations(
    movieName: string,
    traktId: string,
    tmdbId: string,
    coeff: number = 1
  ): Promise<MovieInterface[]> {
    // Get raw recommendations
    const traktRecs = (await this.traktService.getRelatedTraktMovies(traktId)) as TraktType[];
    const tastediveRecs = (await this.tastediveService.getRecommendations(movieName)).Similar
      .Results as TastediveType[];
    const tmdbRecs = await this.tmdbService.getRecommendations(tmdbId);
    const traktActorsRecs = await this.getRecommendationsBasedOnActors(traktId, tmdbId);

    const finalRecommendations: MovieInterface[] = [];

    // Compare Trakt and Tastedive recommendations - if there is the same movie, multiply it's coeff by 2
    for (const traktRec of traktRecs) {
      const idx = tastediveRecs.findIndex((tastediveRec) => tastediveRec.Name === traktRec.title);
      const idx2 = tmdbRecs.findIndex((tmdbRec: { title: string }) => tmdbRec.title === traktRec.title);
      if (idx >= 0) {
        // Same movie is in Trakt and in Tastedive recommendations -> multiply it's importance
        const movObj = await this.movieService.getMovieObject(traktRec.ids.trakt, traktRec.ids.tmdb);
        finalRecommendations.push({ ...movObj, coeff: coeff * 2 });
      } else if (idx2 >= 0) {
        // Same movie is in Trakt and in TMDB recommendations -> multiply it's importance
        const movObj = await this.movieService.getMovieObject(traktRec.ids.trakt, traktRec.ids.tmdb);
        finalRecommendations.push({ ...movObj, coeff: coeff * 2 });
      } else if (idx >= 0 && idx2 >= 0) {
        // Same movie is in Trakt, TMDB and Tastedive recommendations -> multiply it's importance
        const movObj = await this.movieService.getMovieObject(traktRec.ids.trakt, traktRec.ids.tmdb);
        finalRecommendations.push({ ...movObj, coeff: coeff * 3 });
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
      }
    }

    return finalRecommendations;
  }

  // From popular actors of some movie return list of actor popular movies
  async getRecommendationsBasedOnActors(traktId: string, tmdbId: string) {
    const movieObject = (await this.movieService.getMovieObject(traktId, tmdbId)) as MovieInterface;

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
