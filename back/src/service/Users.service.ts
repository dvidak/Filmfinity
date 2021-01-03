import TraktService from './Trakt.service';

class UsersService {
  private traktService: TraktService;

  constructor() {
    this.traktService = new TraktService();
  }

  /**
   * Method adds movie to the user's watchlist.
   * @param userId ID of the user (facebook ID!)
   * @param movieId ID of the movie (trakt ID!)
   */
  public async addToWatchlist(userId: string, movieId: string) {
    // TODO
    console.log('Should add to watch list', userId, movieId);
  }

  public async removeFromWatchlist(userId: string, movieID: string) {
    // TODO
  }

  public async addToWatchedList(userId: string, movieId: string) {
    // TODO
  }

  public async removeFromWatchedList(userId: string, movieId: string) {
    // TODO
  }
}

export default UsersService;
