import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IAuth, IAuthReq } from '@interfaces/IAuth';
import { IError } from '@interfaces/IErrors';
import ErrorsCode from '@models/ErrorsCode';

class AuthMiddleware {
  public isAuth(req: IAuthReq, res: Response, next: NextFunction) {
    const token = req.get('Authorization')?.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token || '', 'somesupersecretsecret');

      if (!decodedToken) {
        const error: IError = {
          name: 'Not authenticated!',
          message: 'Missing authentication!'
        };

        return res.status(ErrorsCode.ERROR_UNAUTHORIZED).json(error);
      }

      req.userId = (decodedToken as IAuth).userId;
      next();
    } catch (err) {
      return res.status(ErrorsCode.ERROR_INTERNAL_SERVER).json(err);
    }
  }
}

export default new AuthMiddleware();
