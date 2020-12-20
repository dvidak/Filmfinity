import 'reflect-metadata'
import app from './app'
import mongoose from 'mongoose'
import { AppConfig } from './config/config'

const db: string = `mongodb+srv://${AppConfig.MONGO.USER}:${AppConfig.MONGO.PASSWORD}@cluster0.qtigm.mongodb.net/${AppConfig.MONGO.DBNAME}?retryWrites=true&w=majority`
const PORT = 4000

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    app.listen(PORT, async () => {
      console.info('Express server listening on http://localhost:4000')
    })
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error)
  })
