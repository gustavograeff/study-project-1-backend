import { Request } from 'express';

export interface IAuthReq extends Request {
  userId?: string;
}

export interface IAuth {
  email?: string;
  userId: string;
  iat?: number;
  exp?: number;
}
