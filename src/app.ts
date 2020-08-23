import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import routes from './routes';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const MONGO_DB_URL = `mongodb+srv://${process.env.ENV_USER}:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/${process.env.ENV_DB}`;
class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middleWares();
    this.database();
    this.routes();
  }

  private middleWares(): void {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
    this.express.use(morgan('combined', { stream: accessLogStream }));
    this.express.use(compression());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
