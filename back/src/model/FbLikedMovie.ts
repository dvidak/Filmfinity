import mongoose, { Schema, Document } from 'mongoose'
import { userInfo } from 'os'
import User, { UserInterface } from './User'

export interface FbLikedMovieInterface extends Document {
  genre?: string
  name?: string
  verification_status: 'blue_verified' | 'not_verified'
  birthday?: string
  category?: string
  user: UserInterface['facebookId']
}

const FbLikedMovieSchema: Schema = new Schema({
  genre: { type: String, required: false },
  name: { type: String, required: false },
  verification_status: { type: String, required: true },
  birthday: { type: String, required: false },
  category: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, required: true}
})

const FbLikedMovie = mongoose.model<FbLikedMovieInterface>('FbLikedMovie', FbLikedMovieSchema)
export default FbLikedMovie
