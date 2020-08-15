import { ValidationError } from 'express-validator';

export interface IError extends Error {
  expressValidatorErrors?: Array<ValidationError>;
  requestError?: string;
}
