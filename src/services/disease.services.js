import diseaseRepository from '../database/repository/disease.repository.js'
import { getStartIndexAndLimit } from './Pagination.js'
import { logException } from '../middlewares/exception.logs.js'
import { QueryError } from '../errors/QueryError.js'

const handleException = (error) => {
  logException('services', 'disease.services.js', error)
  throw error
}

const create = async (disease) => {
  try {
    const newDisease = await diseaseRepository.create(disease)
    return newDisease
  } catch (error) {
    handleException(error)
  }
}

const getAll = async (page, limit) => {
  try {
    if (page) {
      const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
      const diseases = await diseaseRepository.getAll(startIndex, newLimit)
      return diseases
    }

    const diseases = await diseaseRepository.getAll()
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByChapterId = async (chapterId, page, limit) => {
  try {
    if (page) {
      const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
      const diseases = await diseaseRepository.getByChapterId(
        chapterId,
        startIndex,
        newLimit
      )
      return diseases
    }

    const diseases = await diseaseRepository.getByChapterId(chapterId)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByFourDigitsCode = async (digitsCode) => {
  try {
    const diseases = await diseaseRepository.getByFourDigitsCode(digitsCode)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getById = async (id) => {
  try {
    const disease = await diseaseRepository.getById(id)
    return disease
  } catch (error) {
    handleException(error)
  }
}

const getByKeyword = async (keyword, page, limit) => {
  try {
    if (page) {
      const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
      const diseases = await diseaseRepository.getByKeyword(
        keyword,
        startIndex,
        newLimit
      )
      return diseases
    }

    const diseases = await diseaseRepository.getByKeyword(keyword)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByRange = async (attribute, startRange, endRange, page, limit) => {
  try {
    if (page) {
      const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
      const diseases = await diseaseRepository.getByRange(
        attribute,
        startRange,
        endRange,
        startIndex,
        newLimit
      )
      return diseases
    }

    const diseases = await diseaseRepository.getByRange(attribute, startRange, endRange)
    return diseases
  } catch (error) {
    if (error instanceof QueryError) {
      throw error
    }

    handleException(error)
  }
}

const getByThreeDigitsCode = async (digitsCode, page, limit) => {
  try {
    if (page) {
      const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
      const diseases = await diseaseRepository.getByThreeDigitsCode(digitsCode, startIndex, newLimit)
      return diseases
    }

    const diseases = await diseaseRepository.getByThreeDigitsCode(digitsCode)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const update = async (id, disease) => {
  try {
    const editedDisease = await diseaseRepository.update(id, disease)
    return editedDisease
  } catch (error) {
    handleException(error)
  }
}

const remove = async (id) => {
  try {
    const deletedDisease = await diseaseRepository.remove(id)
    return deletedDisease
  } catch (error) {
    handleException(error)
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
