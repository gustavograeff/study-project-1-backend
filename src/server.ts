import app from './app';

const PORT = process.env.PORT || 8080;

// check later
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); */

app.listen(PORT);
