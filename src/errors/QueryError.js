import { BaseError } from './BaseError.js'

export class QueryError extends BaseError {
  constructor (message) {
    super(message, 400)
  }
}
