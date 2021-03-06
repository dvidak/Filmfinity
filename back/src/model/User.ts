import mongoose, { Schema, Document } from 'mongoose';
import FbLikedMovie, { FbLikedMovieInterface } from './FbLikedMovie';
import Movie, { MovieInterface } from './Movie';

export interface UserInterface extends Document {
  facebookId: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  fbLikedMovies: FbLikedMovieInterface[];
  mappedFbLikedMovies: MovieInterface[];
  watchlist: MovieInterface[];
  watchedList: MovieInterface[];
  facebookRecommendations: MovieInterface[];
  watchlistRecommendations: MovieInterface[];
  watchedListRecommendations: MovieInterface[];
  genresRecommendations: MovieInterface[];
  recommendations: MovieInterface[];
}

const UserSchema: Schema = new Schema({
  facebookId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: false },
  fbLikedMovies: [FbLikedMovie.schema],
  mappedFbLikedMovies: [Movie.schema],
  watchlist: [Movie.schema],
  watchedList: [Movie.schema],
  facebookRecommendations: [Movie.schema],
  watchlistRecommendations: [Movie.schema],
  watchedListRecommendations: [Movie.schema],
  genresRecommendations: [Movie.schema],
  recommendations: [Movie.schema],
});

const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;
