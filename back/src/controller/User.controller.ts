import { Request, Response } from 'express'
import User from '../model/User'

class UserController {
  public getUser(req: Request, res: Response) {
    User.findById(req.params.id, (err: any, user: any) => {
      if (err) {
        res.send(err)
      } else {
        res.send(user)
      }
    })
  }
}

export = new UserController()
