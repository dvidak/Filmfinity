import { Router } from 'express'
import UsersController from '../controller/Users.controller'
import facebookMiddleware from '../middlewares/facebook.middleware'

class UserRouter {
  private _router = Router()
  private controller = UsersController

  get router() {
    return this._router
  }

  constructor() {
    this.configure()
  }

  private configure() {
    this._router.get('/:userId/watchlist', this.controller.getUserWatchlist)
    this._router.post('/:userId/watchlist', this.controller.addToWatchlist)
    this._router.delete('/:userId/watchlist/:movieId', this.controller.removeFromWatchlist)

    this._router.get('/:userId/watched-list', this.controller.getUserWatchedList)
    this._router.post('/:userId/watched-list', this.controller.addToWatchedList)
    this._router.delete('/:userId/watched-list/:movieId', this.controller.removeFromWatchedList)

    this._router.get('/movies', facebookMiddleware.auth, this.controller.getUserMovies)
    this._router.get('/:id', this.controller.getUser)
  }
}

export = new UserRouter().router
