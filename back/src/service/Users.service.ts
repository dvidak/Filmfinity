import { userInfo } from 'os';
import User from '../model/User';
import TraktService from './Trakt.service';
import MovieService from '../service/Movie.service';
import TmdbService from '../service/Tmdb.service';

class UsersService {
  private traktService: TraktService;
  private tmdbService: TmdbService;
  private movieService: MovieService;

  constructor() {
    this.traktService = new TraktService();
    this.tmdbService = new TmdbService();
    this.movieService = new MovieService();
  }

  /**
   * Method adds movie to the user's watchlist.
   * @param userId ID of the user (facebook ID!)
   * @param movieId ID of the movie (trakt ID!)
   */
  public async addToWatchlist(userId: string, movieId: string) {
    const traktMovie = await this.traktService.searchTraktMovieById(movieId);
    const movieObject = await this.movieService.getMovieObject(movieId, traktMovie[0].movie.ids.tmdb);

    User.updateOne(
      { facebookId: userId },
      { $push: { watchlist: movieObject } },
      { new: true },
      function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
      });
    
    console.log('Should add to watch list', userId, movieId);
  }

  public async removeFromWatchlist(userId: string, movieId: string) {
    User.updateOne(
      { facebookId: userId },
      { $pull: { watchlist: { $elemMatch: { traktId: movieId } } } },
      function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
      });
  }

  public async addToWatchedList(userId: string, movieId: string) {
    const traktMovie = await this.traktService.searchTraktMovieById(movieId);
    const movieObject = await this.movieService.getMovieObject(movieId, traktMovie[0].movie.ids.tmdb);

    User.updateOne(
      { facebookId: userId },
      { $push: { watchedList: movieObject } },
      { new: true },
      function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
      });
  }

  public async removeFromWatchedList(userId: string, movieId: string) {
    User.updateOne(
      { facebookId: userId },
      { $pull: { watchedList: { $elemMatch: { traktId: movieId } } } },
      function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
      });
  }
}

export default UsersService;
