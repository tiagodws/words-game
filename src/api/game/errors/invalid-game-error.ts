import { ErrorResponse } from './error-response';

export class InvalidGameError extends ErrorResponse {
  constructor(public message: string) {
    super(message, 403);
  }
}
