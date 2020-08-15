import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserLogin, IUserLoginResponse } from '@interfaces/IUser';
import { IError } from '@interfaces/IErrors';
import ErrorsCode from '@models/ErrorsCode';
import User from '@schemas/User';

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password }: IUserLogin = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        const error: IError = {
          name: 'User not found!',
          message: 'An user with this email could not be found!'
        };
        return res.status(ErrorsCode.ERROR_NOT_FOUND).json(error);
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        const error: IError = {
          name: 'Login error!',
          message: 'Invalid password!'
        };
        return res.status(ErrorsCode.ERROR_ON_VALIDATE_DATA).json(error);
      }

      const token = jwt.sign(
        {
          email,
          userId: user._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );

      const userLoginResponse: IUserLoginResponse = {
        email: user.email,
        token,
        userId: user._id.toString()
      };

      return res.status(200).json(userLoginResponse);
    } catch (err) {
      const error: IError = {
        name: 'Database error!',
        message: 'An ocurred when accessing database!'
      };

      if (!password) {
        error.requestError = 'Missing password on request body!';
        return res.status(ErrorsCode.ERROR_ON_VALIDATE_DATA).json(error);
      }

      return res.status(ErrorsCode.ERROR_NOT_FOUND).json(error);
    }
  }
}

export default new AuthController();
