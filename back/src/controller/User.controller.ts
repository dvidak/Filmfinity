import { Request, Response } from 'express'
import User from '../model/User'
import { getFacebookMovies } from '../service/facebook.service'

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

  public async getUserMovies(req: Request, res: Response) {
    const fbToken = (req as any).accessToken
    const movies = await getFacebookMovies(fbToken)
    res.status(200).json({ movies })
  }
}

export = new UserController()
