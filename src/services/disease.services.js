import diseaseRepository from '../database/repository/disease.repository.js'
import { logException } from '../middlewares/exception.logs.js'

const create = async (disease) => {
  try {
    const newDisease = await diseaseRepository.create(disease)
    return newDisease
  } catch (error) {
    logException('services', 'disease.services.js', error)
    throw error
  }
}

const getAll = async () => {
  try {
    const allDiseases = await diseaseRepository.getAll()
    return allDiseases
  } catch (error) {
    logException('services', 'disease.services.js', error)
    throw error
  }
}

const getByChapterId = async (chapterId) => {
  try {
    const diseases = await diseaseRepository.getByChapterId(chapterId)
    return diseases
  } catch (error) {
    logException('services', 'disease.services.js', error)
    throw error
  }
}

const getById = async (id) => {
  try {
    const disease = await diseaseRepository.getById(id)
    return disease
  } catch (error) {
    logException('services', 'disease.services.js', error)
    throw error
  }
}

const getByFourthDigitsCode = async () => {}

const getByThreeDigitsCode = async () => {}

const update = async (id, disease) => {
  try {
    const editedDisease = await diseaseRepository.update(id, disease)
    return editedDisease
  } catch (error) {
    logException('services', 'disease.services.js', error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const deletedDisease = await diseaseRepository.remove(id)
    return deletedDisease
  } catch (error) {
    logException('services', 'disease.services.js', error)
    throw error
  }
}

export default {
  create,
  getAll,
  getByChapterId,
  getById,
  getByFourthDigitsCode,
  getByThreeDigitsCode,
  update,
  remove
}
