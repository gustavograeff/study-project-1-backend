import User from '@schemas/User';
import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';

const ERROR_ON_SAVE_DATA = 400;
const ERROR_ON_VALIDATE_DATA = 422;

interface IError {
  error: string;
  data: Array<ValidationError>;
}

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    return res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: IError = {
        error: 'Validation error',
        data: errors.array()
      };
      return res.status(ERROR_ON_VALIDATE_DATA).json(error);
    }

    try {
      req.body.password = await this.encryptUserPassword(req);
    } catch (err) {
      return res.status(ERROR_ON_SAVE_DATA).json(err);
    }

    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (err) {
      return res.status(ERROR_ON_SAVE_DATA).json(err);
    }
  }

  public async deleteAll(req: Request, res: Response) {
    const user = await User.findOneAndRemove();

    return res.json(user);
  }

  private encryptUserPassword(req: Request): Promise<string> {
    const { password } = req.body;
    return bcryptjs.hash(password, 12);
  }
}

export default new UserController();
