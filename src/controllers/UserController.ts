import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';

import User from '@schemas/User';

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

  public async createUser(req: Request, res: Response): Promise<any> {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const newUser = await User.create(req.body);
        return res.json(newUser);
      } catch (err) {
        return res.status(ERROR_ON_SAVE_DATA).json(err);
      }
    }

    const error: IError = {
      error: 'Validation error',
      data: errors.array()
    };
    return res.status(ERROR_ON_VALIDATE_DATA).json(error);
  }

  public async deleteAll(req: Request, res: Response) {
    const user = await User.findOneAndRemove();

    return res.json(user);
  }
}

export default new UserController();
