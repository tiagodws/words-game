import { ErrorResponse } from './error-response';

export class InvalidWordError extends ErrorResponse {
  constructor(public message: string) {
    super(message, 400);
  }
}
