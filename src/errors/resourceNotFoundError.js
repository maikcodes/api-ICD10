import { BaseError } from "./baseError.js";

export class ResourceNotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}
