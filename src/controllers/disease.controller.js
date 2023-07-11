import diseaseServices from '../services/disease.services.js'
import { logException } from '../middlewares/exception.logs.js'
import { parseDiseaseRequestBody } from '../helpers/disease.request.helpers.js'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js'
import {
  sendSuccessResponse,
  sendErrorResponse
} from '../helpers/response.helpers.js'

const create = async (req, res) => {
  try {
    const disease = parseDiseaseRequestBody(req)
    const newDisease = await diseaseServices.create(disease)
    await sendSuccessResponse(res, newDisease)
  } catch (error) {
    logException('controllers', 'disease.controllers.js', error)
    await sendErrorResponse(res, error)
  }
}

const getAll = async ({ res }) => {
  try {
    const allDiseases = await diseaseServices.getAll()
    await sendSuccessResponse(res, allDiseases)
  } catch (error) {
    logException('controllers', 'disease.controllers.js', error)
    await sendErrorResponse(res, error)
  }
}

const getByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params
    const diseases = await diseaseServices.getByChapterId(chapterId)

    if (!diseases || diseases.length === 0) {
      throw new ResourceNotFoundError(`Diseases with chapter ${chapterId} were not found`)
    }

    await sendSuccessResponse(res, diseases)
  } catch (error) {
    logException('controllers', 'disease.controllers.js', error)
    await sendErrorResponse(res, error)
  }
}

const getByFourDigitsCode = async (req, res) => {
  try {
    const { digitsCode } = req.params
    const diseases = await diseaseServices.getByFourDigitsCode(digitsCode)

    if (!diseases || diseases.length === 0) {
      throw new ResourceNotFoundError(`Diseases with four digits ${digitsCode} code were not found`)
    }

    await sendSuccessResponse(res, diseases)
  } catch (error) {
    logException('controllers', 'disease.controllers.js', error)
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
    logException('controllers', 'disease.controllers.js', error)
    await sendErrorResponse(res, error)
  }
}

const getByKeyword = async (req, res) => {
  try {
    const { keyword } = req.params
    const diseases = await diseaseServices.getByKeyword(keyword)

    if (!diseases || !diseases.length === 0) {
      throw new ResourceNotFoundError(`Diseases with keyword ${keyword} were not found`)
    }

    await sendSuccessResponse(res, diseases)
  } catch (error) {
    logException('controllers', 'disease.controllers.js')
    await sendErrorResponse(res, error)
  }
}

const getByRange = async (req, res) => {
  try {
    const { range } = req.params
    const [startRange, endRange] = range.split('-')
    const diseases = await diseaseServices.getByRange(startRange, endRange)

    if (!diseases || diseases.length === 0) {
      throw new ResourceNotFoundError(`Diseases in range ${startRange} and ${endRange} was not found`)
    }

    await sendSuccessResponse(res, diseases)
  } catch (error) {
    logException('controllers', 'disease.controllers.js', error)
    await sendErrorResponse(res, error)
  }
}

const getByThreeDigitsCode = async (req, res) => {
  try {
    const { digitsCode } = req.params
    const diseases = await diseaseServices.getByThreeDigitsCode(digitsCode)

    if (!diseases || diseases.length === 0) {
      throw new ResourceNotFoundError(`Diseases with three digits ${digitsCode} code was not found`)
    }

    await sendSuccessResponse(res, diseases)
  } catch (error) {
    logException('controllers', 'disease.controllers.js', error)
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
    logException('controllers', 'disease.controllers.js', error)
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
    logException('controllers', 'disease.controllers.js', error)
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
