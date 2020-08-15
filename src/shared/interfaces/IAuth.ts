import { Request } from 'express';

export interface IAuthReq extends Request {
  auth: IAuth;
}

export interface IAuth {
  email: string;
  userId: string;
  iat?: number;
  exp?: number;
}
