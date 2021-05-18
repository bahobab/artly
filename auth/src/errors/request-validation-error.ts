import { ValidationError } from 'express-validator';

import { CustomError } from './custom-error'

// interface CustomErrors {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field?: string;
//   } []
// }
// preferable to use abstract class to inforc e types on RequestValidationError class

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor (public errors: ValidationError[]) {
    super('Invalid request parameters');

    // This is needed because extending built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => ({message: error.msg, field: error.param}))
  }
}