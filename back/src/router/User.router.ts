import { Router } from 'express'
import UserController from '../controller/User.controller'

class UserRouter {
  private _router = Router()
  private controller = UserController

  get router() {
    return this._router
  }

  constructor() {
    this.configure()
  }

  private configure() {
    this._router.get('/:id', this.controller.getUser)
  }
}

export = new UserRouter().router
