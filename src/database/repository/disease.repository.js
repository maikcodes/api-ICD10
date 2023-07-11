import { Disease } from '../models/disease.js'
import { logException } from '../../middlewares/exception.logs.js'

const create = async (disease) => {
  try {
    const newDisease = new Disease(disease)
    await newDisease.save()
    return newDisease
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const getAll = async () => {
  try {
    const allDisease = await Disease.find()
    return allDisease
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const getByChapterId = async (chapterId) => {
  try {
    const diseases = await Disease.find({ chapter_id: chapterId })
    return diseases
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const getByFourDigitsCode = async (digitsCode) => {
  try {
    const diseases = await Disease.find({ four_code_id: digitsCode })
    return diseases
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const getById = async (id) => {
  try {
    const disease = await Disease.findById(id)
    return disease
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
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
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const getByRange = async (startRange, endRange) => {
  try {
    const diseases = await Disease.find({
      $or: [
        { chapter_id: { $gte: startRange, $lte: endRange } },
        { range_id: { $gte: startRange, $lte: endRange } },
        { sub_range_id: { $gte: startRange, $lte: endRange } },
        { specific_sub_range_id: { $gte: startRange, $lte: endRange } },
        { three_code_id: { $gte: startRange, $lte: endRange } },
        { four_code_id: { $gte: startRange, $lte: endRange } }
      ]
    })
    return diseases
  } catch (error) {
    logException('database', 'disease.repository,js', error)
    throw error
  }
}

const getByThreeDigitsCode = async (digitsCode) => {
  try {
    const diseases = await Disease.find({ three_code_id: digitsCode })
    return diseases
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const update = async (id, disease) => {
  try {
    const updatedDisease = await Disease.findByIdAndUpdate(id, disease, {
      new: true
    })
    return updatedDisease
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const deletedDisease = await Disease.findByIdAndDelete(id)
    return deletedDisease
  } catch (error) {
    logException('database', 'disease.repository.js', error)
    throw error
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
