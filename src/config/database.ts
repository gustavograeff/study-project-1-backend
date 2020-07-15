import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  MONGO_DB_URL: `mongodb+srv://${process.env.ENV_USER}:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/${process.env.ENV_DB}`
};
