import { Router } from 'express';
import { body } from 'express-validator';

import User from '@schemas/User';
import UserController from './controllers/UserController';

const routes = Router();

routes.get('/users', UserController.index);
routes.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid e-mail!')
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });

        if (user) {
          const error = new Error();
          error.message = 'E-mail already registered!';
          throw error;
        }

        return user;
      })
  ],
  UserController.createUser
);
routes.delete('/delete', UserController.deleteAll);

export default routes;
