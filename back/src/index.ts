import 'reflect-metadata';
import app from './app';
import mongoose from 'mongoose';

const db: string = 'mongodb://localhost:27017/filmfinity';
const PORT = 4000;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    app.listen(PORT, () => {
      console.info('Express server listening on http://localhost:4000');
    });
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error);
  });
