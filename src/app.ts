import express, { Router } from 'express';

const app = express();
const router = Router();

router.get('/', (req, res, next) => {
  res.send('Eita mano');
});

app.listen(8080);
