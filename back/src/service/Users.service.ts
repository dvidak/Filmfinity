import { UserInfo, userInfo } from 'os';
import User, { UserInterface } from '../model/User';
import TraktService from './Trakt.service';
import MovieService from './Movie.service';
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
   * Method return user from the database based on the Facebook ID.
   * @param facebookUserId Facebook ID of the user
   */
  async findUser(facebookUserId: string) {
    let user: UserInterface | null;
    try {
      user = await User.findOne({ facebookId: facebookUserId });
    } catch (error) {
      throw new Error(`User ${facebookUserId} not found.`);
    }
    if (!user) throw new Error(`User ${facebookUserId} not found.`);
    return user;
  }

  /**
   * Method returns genres based on genres from Facebook likes and watchlist and watched list.
   * @param facebookUserId Facebook ID of the user
   */
  async getAllUserGenres(facebookUserId: string): Promise<string[]> {
    const user = await this.findUser(facebookUserId);

    let genres: string[] = [];
    for (const fbLikedMovie of user.fbLikedMovies) if (fbLikedMovie.genre) genres.push(fbLikedMovie.genre);

    for (const movie of user.watchlist) if (movie.genres) genres = [...genres, ...movie.genres];

    for (const movie of user.watchedList) if (movie.genres) genres = [...genres, ...movie.genres];

    // console.log('All genres', genres);

    return genres;
  }

  async getUserGenreCount(facebookUserId: string) {
    const user = await this.findUser(facebookUserId);
    let coef = new Map();

    // foreach movie
    for (const fbLikedMovie of user.mappedFbLikedMovies) {
      //foreach genre of movie
      if (fbLikedMovie.genres) {
        for (const genre of fbLikedMovie.genres) {
          if (coef.has(genre)) {
            coef.set(genre, coef.get(genre) + 1);
          } else {
            coef.set(genre, 1);
          }
        }
      }
    }
    return coef;
  }

  /**
   * Method adds movie to the user's watchlist.
   * @param userId ID of the user (facebook ID!)
   * @param movieId ID of the movie (trakt ID!)
   */
  public async addToWatchlist(userId: string, movieId: string) {
    const traktMovie = await this.traktService.searchTraktMovieById(movieId, 'trakt');

    const movieObject = await this.movieService.getMovieObject(movieId, traktMovie[0].movie.ids.tmdb);

    User.updateOne(
      { facebookId: userId },
      { $push: { watchlist: movieObject } },
      { new: true },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          // console.log(success);
        }
      }
    );

    console.log('Adding to watch list', userId, movieId);
  }

  public async removeFromWatchlist(userId: string, movieId: string) {
    User.updateOne(
      { facebookId: userId },
      { $pull: { watchlist: { traktId: movieId as any } } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          // console.log(success);
        }
      }
    );
  }

  public async getUserWatchlist(facebookId: string) {
    const user = await User.findOne({ facebookId });
    return user?.watchlist;
  }

  public async getUserFbMovies(facebookId: string) {
    const user = await User.findOne({ facebookId });
    return user?.mappedFbLikedMovies;
  }

  public async addToWatchedList(userId: string, movieId: string) {
    const traktMovie = await this.traktService.searchTraktMovieById(movieId, 'trakt');
    const tmdbId = Array.isArray(traktMovie)
      ? traktMovie[0].movie
        ? traktMovie[0].movie.ids.tmdb
        : traktMovie[0].ids.tmdb
      : traktMovie.movie
      ? traktMovie.movie.ids.tmdb
      : traktMovie.ids.tmdb;
    const movieObject = await this.movieService.getMovieObject(movieId, tmdbId);

    User.updateOne(
      { facebookId: userId },
      { $push: { watchedList: movieObject } },
      { new: true },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          // console.log(success);
        }
      }
    );
  }

  public async removeFromWatchedList(userId: string, movieId: string) {
    User.updateOne(
      { facebookId: userId },
      { $pull: { watchedList: { traktId: movieId as any } } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          // console.log(success);
        }
      }
    );
  }

  public async getUserWatchedList(facebookId: string) {
    const user = await User.findOne({ facebookId });
    return user?.watchedList;
  }
}

export default UsersService;
