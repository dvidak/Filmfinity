import Axios from 'axios';
import { fbMovieCategories } from '../consts/fbMovieCategories';
import { FbLike } from '../types/FbLike.type';

export const getFacebookMovies = async (fbAccessToken: string) => {
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
      graphRequestUrl = userLikes.data.likes.paging.next;
    } else {
      // Second or any other page
      likesArray = userLikes.data.data;
      graphRequestUrl = userLikes.data.paging.next;
    }

    let tempFbMovies = likesArray as FbLike[];
    fbMovies = [...fbMovies, ...tempFbMovies];

    if (!graphRequestUrl) break;
  }

  // Filter to only movies, films and TV shows
  fbMovies = fbMovies.filter(
    (fbNovie) =>
      fbNovie.category && fbMovieCategories.includes(fbNovie.category)
  );

  return fbMovies;
};
