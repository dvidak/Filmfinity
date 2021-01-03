import { Request, Response } from 'express';
import User from '../model/User';
import { getFacebookMovies } from '../service/facebook.service';
import UsersService from '../service/Users.service';

class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
    this.addToWatchedList = this.addToWatchedList.bind(this);
    this.removeFromWatchedList = this.removeFromWatchedList.bind(this);
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

   // const userId = "10219128442703578"
   // const movieId = 'tron-legacy-2010'

    const addedMovie = await this.usersService.addToWatchlist(userId, movieId);
    res.status(201).json(addedMovie);
  }

  public removeFromWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    console.log(userId, movieId);
  }

  public addToWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.body.movieId;
    console.log(userId, movieId);
  }

  public removeFromWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    console.log(userId, movieId);
  }

  public async getUserMovies(req: Request, res: Response) {
    const fbToken = (req as any).accessToken(req as any).profile.id;
    const movies = await getFacebookMovies(fbToken);
    res.status(200).json({ movies });
  }
}

export = new UsersController();
