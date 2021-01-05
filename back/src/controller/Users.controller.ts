import { Request, Response } from 'express';
import User from '../model/User';
import FacebookService from '../service/Facebook.service';
import MapperService from '../service/Mapper.service';
import RecommendationService from '../service/Recommendation.service';
import UsersService from '../service/Users.service';

class UsersController {
  private usersService: UsersService;
  private facebookService: FacebookService;
  private mapperService: MapperService;
  private recommendationService: RecommendationService;

  constructor() {
    this.usersService = new UsersService();
    this.facebookService = new FacebookService();
    this.mapperService = new MapperService();
    this.recommendationService = new RecommendationService();
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
    this.addToWatchedList = this.addToWatchedList.bind(this);
    this.removeFromWatchedList = this.removeFromWatchedList.bind(this);
    this.getUserWatchlist = this.getUserWatchlist.bind(this);
    this.getUserWatchedList = this.getUserWatchedList.bind(this);
    this.getFacebookRecommendations = this.getFacebookRecommendations.bind(this);
  }

  async getFacebookRecommendations(req: Request, res: Response) {
    await this.recommendationService.generateUserRecommendations(req.params.userId);
    User.findOne({ facebookId: req.params.userId }, (err: any, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user?.facebookRecommendations);
      }
    });
  }

  getGenresRecommendations(req: Request, res: Response) {
    User.findOne({ facebookId: req.params.userId }, (err: any, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user?.genresRecommendations);
      }
    });
  }

  getRecommendations(req: Request, res: Response) {
    User.findOne({ facebookId: req.params.userId }, (err: any, user) => {
      if (err || !user) {
        res.send(err);
      } else {
        res.send(user.recommendations);
      }
    });
  }

  public async getUser(req: Request, res: Response) {
    const user = await User.findOne({ facebookId: req.params.id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User with given id does not exist' });
    }
  }

  public async addToWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    const user = await User.find({ facebookId: userId });
    if (user[0].watchlist.filter((movie) => movie.traktId == movieId).length == 0) {
      const addedMovie = await this.usersService.addToWatchlist(userId, movieId);
      res.status(201).json(addedMovie);
      await this.recommendationService.generateUserWatchlistRecommendations(userId);
      await this.recommendationService.generateUserFacebookRecommendations(userId);
    }
  }

  public async removeFromWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    await this.usersService.removeFromWatchlist(userId, movieId);
    res.status(200);
    await this.recommendationService.generateUserWatchlistRecommendations(userId);
    await this.recommendationService.generateUserFacebookRecommendations(userId);
  }

  public async getUserWatchlist(req: Request, res: Response) {
    const userId = req.params.userId;
    const watchlist = await this.usersService.getUserWatchlist(userId);
    res.status(200).json(watchlist);
  }

  public async addToWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.body.movieId;

    const user = await User.find({ facebookId: userId });
    if (user[0].watchedList.filter((movie) => movie.traktId == movieId).length == 0) {
      const addedMovie = await this.usersService.addToWatchedList(userId, movieId);
      res.status(201).json(addedMovie);
      await this.recommendationService.generateUserWatchlistRecommendations(userId);
      await this.recommendationService.generateUserFacebookRecommendations(userId);
    }
  }

  public async removeFromWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    await this.usersService.removeFromWatchedList(userId, movieId);
    res.status(200);
    await this.recommendationService.generateUserWatchlistRecommendations(userId);
    await this.recommendationService.generateUserFacebookRecommendations(userId);
  }

  public async getUserWatchedList(req: Request, res: Response) {
    const userId = req.params.userId;
    const watchedList = await this.usersService.getUserWatchedList(userId);
    res.status(200).json(watchedList);
  }

  public async getUserMovies(req: Request, res: Response) {
    const fbToken = (req as any).accessToken(req as any).profile.id;

    const movies = await this.facebookService.getFacebookMovies(fbToken);

    // const mapped = await this.mapperService.mapFbLikedMovie();

    res.status(200).json({ movies });
  }
}

export = new UsersController();
