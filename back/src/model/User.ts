import mongoose, { Schema, Document } from 'mongoose';
import FbLikedMovie, { FbLikedMovieInterface } from './FbLikedMovie';
import Movie, { MovieInterface } from './Movie';

export interface UserInterface extends Document {
  facebookId: string;
  firstName: string;
  lastName: string;
  email: string;
  fbLikedMovies: FbLikedMovieInterface[];
  mappedFbLikedMovies: MovieInterface[];
  watchlist: MovieInterface[];
  watchedList: MovieInterface[];
}

const UserSchema: Schema = new Schema({
  facebookId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  fbLikedMovies: [FbLikedMovie.schema],
  mappedFbLikedMovies: [Movie.schema],
  watchlist: [Movie.schema],
  watchedList: [Movie.schema],
});

const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;
