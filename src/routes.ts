import AuthController from '@controllers/AuthController';
import User from '@schemas/User';
import { Router } from 'express';
import { body } from 'express-validator';
import UserController from './controllers/UserController';

const routes = Router();

routes.get('/users', UserController.index);
routes.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid e-mail!')
      .custom(async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
          const error = new Error();
          error.message = 'E-mail already registered!';
          throw error;
        }

        return user;
      }),
    body('password').trim().isLength({ min: 5 }).withMessage('Password min length is 5!'),
    body('firstName').trim().isLength({ min: 3 }).withMessage('First name min length is 3!').not().isEmpty(),
    body('lastName').trim().isLength({ min: 3 }).withMessage('Least name min length is 3!').not().isEmpty()
  ],
  UserController.createUser.bind(UserController)
);
routes.delete('/delete', UserController.deleteAll);
routes.post('/login', AuthController.login.bind(AuthController));

export default routes;
