import { Router } from 'express'
import AuthRouter from './Auth.router'
import UserRouter from './User.router'

class MasterRouter {
  private _router = Router()
  private authRouter = AuthRouter
  private userRouter = UserRouter

  get router() {
    return this._router
  }

  constructor() {
    this.configure()
  }

  private configure() {
    this._router.use('/', this.authRouter)
    this._router.use('/user', this.userRouter)
  }
}

export = new MasterRouter().router
