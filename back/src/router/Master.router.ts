import { Router } from 'express';
import AuthRouter from './Auth.router';
import MovieApiRouter from './MovieApi.router';
import UserRouter from './User.router';

class MasterRouter {
  private _router = Router();
  private authRouter = AuthRouter;
  private userRouter = UserRouter;
  private movieApiRouter = MovieApiRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.use('/', this.authRouter);
    this._router.use('/user', this.userRouter);
    this._router.use('/load', this.movieApiRouter);
  }
}

export = new MasterRouter().router;
