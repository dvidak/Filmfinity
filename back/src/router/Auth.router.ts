import { Router } from 'express'
import AuthController from '../controller/Auth.contoller'
import FacebookMiddleware from '../middlewares/facebook.middleware'

class AuthRouter {
  private _router = Router()
  private controller = AuthController
  private facebookMiddleware = FacebookMiddleware

  get router() {
    return this._router
  }

  constructor() {
    this.configure()
  }

  private configure() {
    this._router.get('/login', this.facebookMiddleware.auth, this.controller.login)
  }
}

export = new AuthRouter().router
