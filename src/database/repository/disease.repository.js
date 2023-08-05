import { Disease } from '../models/disease.js'
import { logException } from '../../middlewares/exception.logs.js'
import { attributesMapping } from './diseaseAttributesMapping.js'
import { QueryError } from '../../errors/QueryError.js'

const handleException = (error) => {
  logException('database', 'disease.repository.js', error)
  throw error
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

const getAll = async () => {
  try {
    const allDisease = await Disease.find()
    return allDisease
  } catch (error) {
    handleException(error)
  }
}

const getByChapterId = async (chapterId) => {
  try {
    const diseases = await Disease.find({ chapter_id: chapterId })
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

const getByKeyword = async (keyword) => {
  try {
    const diseases = await Disease.find({
      $or: [
        { three_code_title: { $regex: `.*${keyword}.*`, $options: 'i' } },
        { four_code_title: { $regex: `.*${keyword}.*`, $options: 'i' } }
      ]
    })
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByRange = async (attribute, startRange, endRange) => {
  try {
    const attributeMapped = attributesMapping[attribute]

    if (!attributeMapped) {
      throw new QueryError(`Invalid attribute ${attribute}`)
    }

    const diseases = await Disease.find({
      [attributeMapped]: { $gte: startRange, $lte: endRange }
    })
    return diseases
  } catch (error) {
    handleException(error)
  }
}

const getByThreeDigitsCode = async (digitsCode) => {
  try {
    const diseases = await Disease.find({ three_code_id: digitsCode })
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
