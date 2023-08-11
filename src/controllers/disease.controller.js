import diseaseServices from '../services/disease.services.js'
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

const create = async (req, res) => {
  try {
    const disease = parseDiseaseRequestBody(req)
    const newDisease = await diseaseServices.create(disease)
    await sendSuccessResponse(res, newDisease)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

const getAll = async (req, res) => {
  try {
    const { page, limit } = req.query
    const allDiseases = await diseaseServices.getAll(page, limit)
    const results = formatResults(allDiseases, page)
    await sendSuccessResponse(res, results)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

const getByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params
    const { page, limit } = req.query

    const diseases = await diseaseServices.getByChapterId(chapterId, page, limit)

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

const getByFourDigitsCode = async (req, res) => {
  try {
    const { digitsCode } = req.params
    const diseases = await diseaseServices.getByFourDigitsCode(digitsCode)

    if (!diseases || diseases.length === 0) {
      throw new ResourceNotFoundError(
        `Diseases with four digits ${digitsCode} code were not found`
      )
    }

    await sendSuccessResponse(res, diseases)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const disease = await diseaseServices.getById(id)

    if (!disease) {
      throw new ResourceNotFoundError(`Disease with id ${id} was not found`)
    }

    await sendSuccessResponse(res, disease)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

const getByKeyword = async (req, res) => {
  try {
    const { keyword } = req.params
    const { page, limit } = req.query

    const diseases = await diseaseServices.getByKeyword(keyword, page, limit)

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

const getByRange = async (req, res) => {
  try {
    const { attribute, range } = req.params
    const { page, limit } = req.query
    const [startRange, endRange] = range.split('-')
    const diseases = await diseaseServices.getByRange(
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

const getByThreeDigitsCode = async (req, res) => {
  try {
    const { digitsCode } = req.params
    const { page, limit } = req.query

    const diseases = await diseaseServices.getByThreeDigitsCode(digitsCode, page, limit)

    if (!diseases || diseases.length === 0) {
      throw new ResourceNotFoundError(
        `Diseases with three digits ${digitsCode} code were not found`
      )
    }

    const results = formatResults(diseases, page)
    await sendSuccessResponse(res, results)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const disease = parseDiseaseRequestBody(req)
    const editedDisease = await diseaseServices.update(id, disease)

    if (!editedDisease) {
      throw new ResourceNotFoundError('Disease not found')
    }

    await sendSuccessResponse(res, editedDisease)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const deletedDisease = await diseaseServices.remove(id)

    if (!deletedDisease) {
      throw new ResourceNotFoundError('Disease not found')
    }

    await sendSuccessResponse(res, deletedDisease)
  } catch (error) {
    handleException(error)
    await sendErrorResponse(res, error)
  }
}

export default {
  create,
  getAll,
  getByChapterId,
  getByFourDigitsCode,
  getById,
  getByKeyword,
  getByRange,
  getByThreeDigitsCode,
  update,
  remove
}
