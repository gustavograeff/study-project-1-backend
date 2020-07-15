import { Request, Response, NextFunction } from 'express';

import User from '@schemas/User';

class UserController {
  public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const users = await User.find();

    return res.json(users);
  }

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const newUser = await User.create(req.body);

    return res.json(newUser);
  }
}

export default new UserController();
