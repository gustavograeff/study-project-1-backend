import { Request, Response } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';

import User from '@schemas/User';

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
      const newUser = await User.create(req.body);
      return res.json(newUser);
    }

    const error: IError = {
      error: 'Validation error',
      data: errors.array()
    };
    return res.status(422).json(error);
  }

  public async deleteAll(req: Request, res: Response) {
    const user = await User.findOneAndRemove();

    return res.json(user);
  }
}

export default new UserController();
