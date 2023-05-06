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
    logException('controllers', __filename, error)
    await sendErrorResponse(res, error)
  }
}

const getAll = async ({ res }) => {
  try {
    const allDiseases = await diseaseServices.getAll()
    await sendSuccessResponse(res, allDiseases)
  } catch (error) {
    logException('controllers', __filename, error)
    await sendErrorResponse(res, error)
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const disease = await diseaseServices.getById(id)

    if (!disease) {
      throw new ResourceNotFoundError('Disease not found')
    }

    await sendSuccessResponse(res, disease)
  } catch (error) {
    logException('controllers', __filename, error)
    await sendErrorResponse(res, error)
  }
}

const getByFourthDigitsCode = async (req, res) => {}

const getByThreeDigitsCode = async (req, res) => {}

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
    logException('controllers', __filename, error)
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
    await sendErrorResponse(res, error)
  }
}

export default {
  create,
  getAll,
  getById,
  getByFourthDigitsCode,
  getByThreeDigitsCode,
  update,
  remove
}
