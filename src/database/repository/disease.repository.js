import { Disease } from '../models/disease.js'
import { logException } from '../../middlewares/exception.logs.js'

const create = async (disease) => {
  try {
    const newDisease = new Disease(disease)
    await newDisease.save()
    return newDisease
  } catch (error) {
    logException('database', __filename, error)
    throw error
  }
}

const getAll = async () => {
  try {
    const allDisease = await Disease.find()
    return allDisease
  } catch (error) {
    logException('database', __filename, error)
    throw error
  }
}

const getById = async (id) => {
  try {
    const disease = await Disease.findById(id)
    return disease
  } catch (error) {
    logException('database', __filename, error)
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
    logException('database', __filename, error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const deletedDisease = await Disease.findByIdAndDelete(id)
    return deletedDisease
  } catch (error) {
    logException('database', __filename, error)
    throw error
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  remove
}
