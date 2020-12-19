import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import MasterRouter from './router/Master.router';

class App {
  public app: express.Application;
  public router = MasterRouter;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use('/api', this.router);
  }
}
export default new App().app;
