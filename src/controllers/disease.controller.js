import { DiseaseServices } from '../services/disease.services.js'
import { logException } from '../middlewares/exception.logs.js'
import { parseDiseaseRequestBody } from '../controllers/helpers/disease.request.helpers.js'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js'
import {
  sendSuccessResponse,
  sendErrorResponse
} from '../controllers/helpers/response.helpers.js'
import { QueryError } from '../errors/QueryError.js'
import { formatResults } from './helpers/Pagination.js'

const handleException = (error) => {
  logException('controllers', 'disease.controllers.js', error)
}

export class DiseaseController {
  static async create (req, res) {
    try {
      const disease = parseDiseaseRequestBody(req)
      const newDisease = await DiseaseServices.create(disease)
      await sendSuccessResponse(res, newDisease, 201)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getAll (req, res) {
    try {
      const { page, limit } = req.query
      const allDiseases = await DiseaseServices.getAll(page, limit)
      const results = formatResults(allDiseases, page)
      await sendSuccessResponse(res, results)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getByChapterId (req, res) {
    try {
      const { chapterId } = req.params
      const { page, limit } = req.query

      const diseases = await DiseaseServices.getByChapterId(
        chapterId,
        page,
        limit
      )

      if (!diseases || diseases.length === 0) {
        throw new ResourceNotFoundError(
          `Diseases with chapter ${chapterId} were not found`
        )
      }

      const results = formatResults(diseases, page)
      await sendSuccessResponse(res, results)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getByFourDigitsCode (req, res) {
    try {
      const { fourDigitsCode } = req.params
      const diseases = await DiseaseServices.getByFourDigitsCode(
        fourDigitsCode
      )

      if (!diseases || diseases.length === 0) {
        throw new ResourceNotFoundError(
          `Diseases with four digits ${fourDigitsCode} code were not found`
        )
      }

      await sendSuccessResponse(res, diseases)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getById (req, res) {
    try {
      const { id } = req.params
      const disease = await DiseaseServices.getById(id)

      if (!disease) {
        throw new ResourceNotFoundError(`Disease with id ${id} was not found`)
      }

      await sendSuccessResponse(res, disease)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getByKeyword (req, res) {
    try {
      const { keyword } = req.params
      const { page, limit } = req.query

      const diseases = await DiseaseServices.getByKeyword(keyword, page, limit)

      if (!diseases || !diseases.length === 0) {
        throw new ResourceNotFoundError(
          `Diseases with keyword ${keyword} were not found`
        )
      }

      const results = formatResults(diseases, page)
      await sendSuccessResponse(res, results)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getByRange (req, res) {
    try {
      const { attribute, range } = req.params
      const { page, limit } = req.query
      const [startRange, endRange] = range.split('-')
      const diseases = await DiseaseServices.getByRange(
        attribute,
        startRange,
        endRange,
        page,
        limit
      )

      if (!diseases) {
        throw new ResourceNotFoundError(
          `Diseases in range ${startRange} - ${endRange} were not found`
        )
      }

      const results = formatResults(diseases, page)
      await sendSuccessResponse(res, results)
    } catch (error) {
      if (error instanceof QueryError) {
        error.message = error.message.replace('attribute', 'parameter')
        await sendErrorResponse(res, error)
        return
      }

      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async getByThreeDigitsCode (req, res) {
    try {
      const { threeDigitsCode } = req.params
      const { page, limit } = req.query

      const diseases = await DiseaseServices.getByThreeDigitsCode(
        threeDigitsCode,
        page,
        limit
      )

      if (!diseases || diseases.length === 0) {
        throw new ResourceNotFoundError(
          `Diseases with three digits ${threeDigitsCode} code were not found`
        )
      }

      const results = formatResults(diseases, page)
      await sendSuccessResponse(res, results)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async update (req, res) {
    try {
      const { id } = req.params
      const disease = parseDiseaseRequestBody(req)
      const editedDisease = await DiseaseServices.update(id, disease)

      if (!editedDisease) {
        throw new ResourceNotFoundError('Disease not found')
      }

      await sendSuccessResponse(res, editedDisease)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }

  static async remove (req, res) {
    try {
      const { id } = req.params
      const deletedDisease = await DiseaseServices.remove(id)

      if (!deletedDisease) {
        throw new ResourceNotFoundError('Disease not found')
      }

      await sendSuccessResponse(res, deletedDisease)
    } catch (error) {
      handleException(error)
      await sendErrorResponse(res, error)
    }
  }
}
