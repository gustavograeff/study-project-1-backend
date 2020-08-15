import Feed from '@schemas/Feed';
import ErrorsCode from '@models/ErrorsCode';
import { Request, Response } from 'express';

class FeedController {
  public async createPost(req: Request, res: Response) {
    try {
      const newPost = await Feed.create(req.body);
      return res.json(newPost);
    } catch (err) {
      return res.status(ErrorsCode.ERROR_ON_SAVE_DATA).json(err);
    }
  }
}

export default new FeedController();
