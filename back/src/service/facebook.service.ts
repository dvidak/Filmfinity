import Axios from 'axios';
import { fbMovieCategories } from '../consts/fbMovieCategories';
import FbLikedMovie, { FbLikedMovieInterface } from '../model/FbLikedMovie';
import User from '../model/User';
import { FbLike } from '../types/FbLike.type';

class FacebookService {
  /**
   * Function gets all liked facebook movies and updates database.
   * Returns true if there was an update; false if not.
   * @param facebookUserId Facebook User ID
   * @param fbAccessToken Facebook Access token
   */
  public async reloadFacebookMovies(facebookUserId: string, fbAccessToken: string) {
    const newFbMovies = await this.getFacebookMovies(fbAccessToken);
    const savedUser = await User.findOne({ facebookId: facebookUserId });

    // User does not exist
    if (!savedUser) return false;
    let requiresUpdate = false;

    for (const newFbMovie of newFbMovies) {
      const foundIndex = savedUser.fbLikedMovies.findIndex((fbLikedMovie) => fbLikedMovie.facebookId === newFbMovie.id);
      if (foundIndex < 0) {
        requiresUpdate = true;
        break;
      }
    }

    if (requiresUpdate) {
      // User has new movie liked.
      const fbLikedMovies: FbLikedMovieInterface[] = [];
      for (const newFbMovie of newFbMovies) {
        fbLikedMovies.push(
          new FbLikedMovie({
            facebookId: newFbMovie.id,
            genre: newFbMovie.genre,
            name: newFbMovie.name,
            verification_status: newFbMovie.verification_status,
            birthday: newFbMovie.birthday,
            category: newFbMovie.category,
          })
        );
      }
      await User.updateOne({ facebookId: facebookUserId }, { fbLikedMovies: fbLikedMovies });
      console.log(`[FacebookService] User (${facebookUserId}) liked movies updated.`);
      return true;
    } else {
      // User does not have any new movie liked.
      console.log(`[FacebookService] User (${facebookUserId}) does not require updating liked movies.`);
      return false;
    }
  }

  /**
   * Method returns all movies user has liked.
   * @param fbAccessToken Facebook Acess token
   */
  public async getFacebookMovies(fbAccessToken: string) {
    let fbMovies: FbLike[] = [];
    let graphRequestUrl =
      'https://graph.facebook.com/v8.0/me?fields=likes.limit(9999){genre,name,verification_status,category,birthday}&access_token=' +
      fbAccessToken;

    while (true) {
      const userLikes = await Axios.get(graphRequestUrl);

      let likesArray;

      if (userLikes.data.likes) {
        // First page
        likesArray = userLikes.data.likes.data;
        graphRequestUrl = userLikes.data.likes.paging?.next;
      } else {
        // Second or any other page
        likesArray = userLikes.data.data;
        graphRequestUrl = userLikes.data.paging?.next;
      }

      let tempFbMovies = likesArray as FbLike[];

      if (tempFbMovies) fbMovies = [...fbMovies, ...tempFbMovies];

      if (!graphRequestUrl) break;
    }

    // Filter to only movies, films and TV shows
    fbMovies = fbMovies.filter((fbNovie) => fbNovie.category && fbMovieCategories.includes(fbNovie.category));

    return fbMovies;
  }
}

export default FacebookService;
