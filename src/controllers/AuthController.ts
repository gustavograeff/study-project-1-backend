import { Request, Response } from 'express';
import User from '../schemas/User';
import ErrorsCode from '../shared/models/ErrorsCode';
import { IError } from '../shared/interfaces/Errors';

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const user = await User.findOne(req.body.email);

      if (!user) {
        const error: IError = {
          error: 'An user with this email could not be found!'
        };
        res.status(ErrorsCode.ERROR_NOT_FOUND).json(error);
      }
    } catch (err) {
      const error: IError = {
        error: 'An user with this email could not be found!',
        requestDefaultValidation: err
      };
      res.status(ErrorsCode.ERROR_NOT_FOUND).json(error);
    }
  }
}
