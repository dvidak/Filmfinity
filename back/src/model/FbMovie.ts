import mongoose, { Schema, Document } from 'mongoose'

export interface FbMovieInterface extends Document {
  genre?: string
  name?: string
  verification_status: 'blue_verified' | 'not_verified'
  birthday?: string
  category?: string
}

const FbMovieSchema: Schema = new Schema({
  genre: { type: String, required: false },
  name: { type: String, required: false },
  verification_status: { type: String, required: true },
  birthday: { type: String, required: false },
  category: { type: String, required: false },
})

const FbMovie = mongoose.model<FbMovieInterface>('FbMovie', FbMovieSchema)
export default FbMovie
