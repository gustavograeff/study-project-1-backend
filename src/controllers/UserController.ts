import User from '@schemas/User';
import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IError } from '../shared/interfaces/Errors';
import ErrorCodes from '../shared/models/ErrorsCode';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    return res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: IError = {
        name: 'Validation error!',
        message: 'Error on call request!',
        requestDefaultValidationError: errors.array()
      };
      return res.status(ErrorCodes.ERROR_ON_VALIDATE_DATA).json(error);
    }

    try {
      req.body.password = await this.encryptUserPassword(req);
    } catch (err) {
      return res.status(ErrorCodes.ERROR_ON_SAVE_DATA).json(err);
    }

    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (err) {
      return res.status(ErrorCodes.ERROR_ON_SAVE_DATA).json(err);
    }
  }

  public async deleteAll(req: Request, res: Response): Promise<Response> {
    const user = await User.findOneAndRemove();

    return res.json(user);
  }

  private encryptUserPassword(req: Request): Promise<string> {
    const { password } = req.body;
    return bcryptjs.hash(password, 12);
  }
}

export default new UserController();
