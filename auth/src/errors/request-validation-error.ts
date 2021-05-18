import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor (public errors: ValidationError[]) {
    super();

    // This is needed because extending built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

}