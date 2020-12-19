import { Router } from 'express';
import MovieApiController from '../controller/MovieApi.controller';

class MovieApiRouter {
  private _router = Router();
  private controller = MovieApiController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('/', this.controller.load);
  }
}

export = new MovieApiRouter().router;
