import mongoose, { Schema, Document } from 'mongoose';

export interface FbLikedMovieInterface extends Document {
  facebookId: string;
  genre?: string;
  name?: string;
  verification_status: 'blue_verified' | 'not_verified';
  birthday?: string;
  category?: string;
}

const FbLikedMovieSchema: Schema = new Schema({
  facebookId: { type: String, required: true },
  genre: { type: String, required: false },
  name: { type: String, required: false },
  verification_status: { type: String, required: true },
  birthday: { type: String, required: false },
  category: { type: String, required: false },
});

const FbLikedMovie = mongoose.model<FbLikedMovieInterface>('FbLikedMovie', FbLikedMovieSchema);
export default FbLikedMovie;
