import mongoose, { Schema, Document } from 'mongoose';
import FbMovie from './FbMovie';
import Movie from './Movie';

export interface UserInterface extends Document {
  facebookId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  facebookId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  fbMovies: [FbMovie.schema],
  watchlist: [Movie.schema],
  watchedList: [Movie.schema],
});

const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;
