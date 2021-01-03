import { Request, Response } from 'express';
import User from '../model/User';
import FacebookService from '../service/Facebook.service';

class AuthController {
  private facebookService: FacebookService;

  constructor() {
    this.facebookService = new FacebookService();
    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response) {
    const profile = (req as any).profile;
    const accessToken = (req as any).accessToken;
    const existingUser = await User.findOne({ facebookId: profile.id });

    if (!existingUser) {
      const newUser = new User({
        facebookId: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
      });

      await newUser.save();
    }

    const savedUser = await User.findOne({ facebookId: profile.id });

    if (savedUser) {
      // Update user liked movies.
      const reloadedLikedMovies = await this.facebookService.reloadFacebookMovies(savedUser.facebookId, accessToken);
      // If movies are reloaded, need to re-run recommendation algorithm
      // TODO

      res.send({
        success: true,
        token: (req as any).token,
        id: savedUser.id,
        name: savedUser.firstName,
        facebookId: savedUser.facebookId,
      });
    } else {
      res.send(400).json({ message: 'Something went wrong' });
    }
  }
}

export = new AuthController();
