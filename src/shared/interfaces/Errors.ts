import { ValidationError } from 'express-validator';

export interface IError extends Error {
  requestDefaultValidationError?: Array<ValidationError>;
}
