import { Request, Response } from 'express';
import User from '../model/User';
import FacebookService from '../service/Facebook.service';
import MapperService from '../service/Mapper.service';
import UsersService from '../service/Users.service';

class UsersController {
  private usersService: UsersService;
  private facebookService: FacebookService;
  private mapperService: MapperService;

  constructor() {
    this.usersService = new UsersService();
    this.facebookService = new FacebookService();
    this.mapperService = new MapperService();
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
    this.addToWatchedList = this.addToWatchedList.bind(this);
    this.removeFromWatchedList = this.removeFromWatchedList.bind(this);
    this.getUserWatchlist = this.getUserWatchlist.bind(this);
    this.getUserWatchedList = this.getUserWatchedList.bind(this);
  }

  public getUser(req: Request, res: Response) {
    User.findById(req.params.id, (err: any, user: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  }

  public async addToWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.body.movieId;
    console.log(userId, movieId);

    const user = await User.find( { facebookId: userId } );
    if (user[0].watchlist.filter(movie => movie.traktId == movieId).length == 0) {
      const addedMovie = await this.usersService.addToWatchlist(userId, movieId);
      res.status(201).json(addedMovie);
    }
 
  }

  public async removeFromWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    await this.usersService.removeFromWatchlist(userId, movieId);
  }

  public async getUserWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const watchlist = await this.usersService.getUserWatchlist(userId);
    res.status(200).json(watchlist);
  }

  public async addToWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    const user = await User.find( { facebookId: userId } );
    if (user[0].watchedList.filter(movie => movie.traktId == movieId).length == 0) {
      const addedMovie = await this.usersService.addToWatchedList(userId, movieId);
      res.status(201).json(addedMovie);
    }

  }

  public async removeFromWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    await this.usersService.removeFromWatchedList(userId, movieId);
  }

  public async getUserWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const watchedList = await this.usersService.getUserWatchedList(userId);
    res.status(200).json(watchedList);
  }

  public async getUserMovies(req: Request, res: Response) {
    const fbToken = (req as any).accessToken(req as any).profile.id;

    console.log((req as any).user);

    const movies = await this.facebookService.getFacebookMovies(fbToken);

    // const mapped = await this.mapperService.mapFbLikedMovie();

    res.status(200).json({ movies });
  }
}

export = new UsersController();
