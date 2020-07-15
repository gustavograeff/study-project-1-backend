import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

const MONGO_DB_URL =
  'mongodb+srv://gustavo-rw:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/users';
class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
