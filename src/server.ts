// import https from 'https';
// import fs from 'fs';
import app from './app';

const PORT = process.env.PORT || 8080;

// check later
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); */

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');
// https.createServer({ key: privateKey, cert: certificate }, app).listen(PORT);
console.log('THIS IS HEROKU PORT => ', PORT);
app.listen(PORT);
