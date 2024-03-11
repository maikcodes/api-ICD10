import { Disease } from '../models/disease.js'
import { logException } from '../../middlewares/exception.logs.js'
import { attributesMapping } from './diseaseAttributesMapping.js'
import { QueryError } from '../../errors/QueryError.js'

const handleException = (error) => {
  logException('database', 'disease.repository.js', error)
  throw error
}

const findSkipAndLimit = async (skip = null, limit = null, query = {}) => {
  try {
    const results = await Disease.find(query).skip(skip).limit(limit)
    return results
  } catch (error) {
    handleException(error)
  }
}

const foundItemsCount = async (query) => {
  try {
    const countedResults = await Disease.find(query).countDocuments()
    return countedResults
  } catch (error) {
    handleException(error)
  }
}

const executeQuery = async (skip, limit, query) => {
  let result = await findSkipAndLimit(skip, limit, query)

  if (typeof skip === 'number') {
    const totalDiseases = await foundItemsCount(query)
    result = { data: result, total: totalDiseases, limit }
  }

  return result
}

const create = async (disease) => {
  try {
    const newDisease = new Disease(disease)
    await newDisease.save()
    return newDisease
  } catch (error) {
    handleException(error)
  }
}

const getAll = async (skip = null, limit = null) => {
  try {
    const allDisease = await executeQuery(skip, limit)
    return allDisease
  } catch (error) {
    handleException(error)
  }
}

const getByChapterId = async (chapterId, skip = null, limit = null) => {
  try {
    const query = { chapter_id: chapterId }
    const diseases = await executeQuery(skip, limit, query)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByFourDigitsCode = async (digitsCode) => {
  try {
    const diseases = await Disease.find({ four_code_id: digitsCode })
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getById = async (id) => {
  try {
    const disease = await Disease.findById(id)
    return disease
  } catch (error) {
    handleException(error)
  }
}

const getByKeyword = async (keyword, skip = null, limit = null) => {
  try {
    const query = {
      $or: [
        { three_code_title: { $regex: `.*${keyword}.*`, $options: 'i' } },
        { four_code_title: { $regex: `.*${keyword}.*`, $options: 'i' } }
      ]
    }
    const diseases = await executeQuery(skip, limit, query)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByRange = async (
  attribute,
  startRange,
  endRange,
  skip = null,
  limit = null
) => {
  try {
    const attributeMapped = attributesMapping[attribute]

    if (!attributeMapped) {
      throw new QueryError(`Invalid attribute ${attribute}`)
    }

    const query = { [attributeMapped]: { $gte: startRange, $lte: endRange } }
    const diseases = await executeQuery(skip, limit, query)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByThreeDigitsCode = async (digitsCode, skip = null, limit = null) => {
  try {
    const query = { three_code_id: digitsCode }
    const diseases = executeQuery(skip, limit, query)
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const update = async (id, disease) => {
  try {
    const updatedDisease = await Disease.findByIdAndUpdate(id, disease, {
      new: true
    })
    return updatedDisease
  } catch (error) {
    handleException(error)
  }
}

const remove = async (id) => {
  try {
    const deletedDisease = await Disease.findByIdAndDelete(id)
    return deletedDisease
  } catch (error) {
    handleException(error)
  }
}

const bulkInsert = async (diseases) => {
  try {
    await Disease.insertMany(diseases)
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
  remove,
  bulkInsert
}
