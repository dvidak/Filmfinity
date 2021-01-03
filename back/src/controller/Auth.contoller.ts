import { Request, Response } from 'express';
import User from '../model/User';
import { getFacebookMovies } from '../service/facebook.service';

class AuthController {
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

    // Add liked movies to database
    // TODO - save user's movie in database
    const myFbMovies = await getFacebookMovies(accessToken);
    // console.log('myFbMovies', myFbMovies);

    const savedUser = await User.findOne({ facebookId: profile.id });

    if (savedUser) {
      res.send({
        success: true,
        token: (req as any).token,
        id: savedUser.id,
        name: savedUser.firstName,
      });
    } else {
      res.send(400).json({ message: 'Something went wrong' });
    }
  }
}

export = new AuthController();
