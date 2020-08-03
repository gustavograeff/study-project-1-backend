import { ValidationError } from 'express-validator';

export interface IError {
  error: string;
  requestDefaultValidation?: Array<ValidationError>;
}
