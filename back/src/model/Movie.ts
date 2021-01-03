import mongoose, { Schema, Document } from 'mongoose';

export interface MovieInterface extends Document {
  released: string;
  title: string;
  originalTitle?: string;
  overview?: string;
  runtime?: number;
  country?: string;
  trailer?: string;
  homepage?: string;
  popularity?: number;
  poster?: string;
  traktId: number;
}

const MovieSchema: Schema = new Schema({
  released: { type: String, required: true },
  title: { type: String, required: true },
  originalTitle: { type: String, required: false },
  overview: { type: String, required: false },
  runtime: { type: String, required: false },
  country: { type: String, required: false },
  trailer: { type: String, required: false },
  homepage: { type: String, required: false },
  popularity: { type: Number, required: false },
  poster: { type: String, required: false },
  traktId: { type: Number, required: true },
});

const Movie = mongoose.model<MovieInterface>('Movie', MovieSchema);
export default Movie;
