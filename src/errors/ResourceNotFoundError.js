import { BaseError } from './BaseError.js'

export class ResourceNotFoundError extends BaseError {
  constructor (message) {
    super(message, 404)
  }
}
