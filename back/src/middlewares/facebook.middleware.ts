import Axios from 'axios'
import { NextFunction, Request, Response } from 'express'

class FacebookMiddleware {
  public async auth(req: Request, res: Response, next: NextFunction) {
    const headerAuth = req.headers.authorization

    if (!headerAuth) {
      return res.status(403).json({ message: 'Token is required.' })
    }

    const authToken = headerAuth.substring(7, headerAuth.length)

    try {
      const facebookResponse = await Axios.get(
        `https://graph.facebook.com/v8.0/me?fields=id,email,first_name,last_name&access_token=${authToken}`
      )

      ;(req as any).profile = facebookResponse.data
      ;(req as any).token = authToken
      return next()
    } catch (error) {
      const status = error.response.status
      const message = error.response.statusText
      return res.status(status).json({ message: message })
    }
  }
}

export = new FacebookMiddleware()
