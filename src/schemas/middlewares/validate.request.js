import { sendErrorResponse } from '../../controllers/helpers/response.helpers.js'

export const schemaValidation = (validations) => (req, res, next) => {
  try {
    for (const validation of validations) {
      const result = validation(req)

      if (!result.success) {
        return sendErrorResponse(res, result.error.issues)
      }
    }

    next()
  } catch (error) {
    return sendErrorResponse(res, error)
  }
}
