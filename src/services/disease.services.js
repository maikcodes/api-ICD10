import { DiseaseRepository } from '../database/repository/disease.repository.js'
import { getStartIndexAndLimit } from './Pagination.js'
import { logException } from '../middlewares/exception.logs.js'
import { QueryError } from '../errors/QueryError.js'

const handleException = (error) => {
  logException('services', 'disease.services.js', error)
  throw error
}

export class DiseaseServices {
  static async create (disease) {
    try {
      const newDisease = await DiseaseRepository.create(disease)
      return newDisease
    } catch (error) {
      handleException(error)
    }
  }

  static async getAll (page, limit) {
    try {
      if (page) {
        const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
        const diseases = await DiseaseRepository.getAll(startIndex, newLimit)
        return diseases
      }

      const diseases = await DiseaseRepository.getAll()
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getByChapterId (chapterId, page, limit) {
    try {
      if (page) {
        const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
        const diseases = await DiseaseRepository.getByChapterId(
          chapterId,
          startIndex,
          newLimit
        )
        return diseases
      }

      const diseases = await DiseaseRepository.getByChapterId(chapterId)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getByFourDigitsCode (digitsCode) {
    try {
      const diseases = await DiseaseRepository.getByFourDigitsCode(digitsCode)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getById (id) {
    try {
      const disease = await DiseaseRepository.getById(id)
      return disease
    } catch (error) {
      handleException(error)
    }
  }

  static async getByKeyword (keyword, page, limit) {
    try {
      if (page) {
        const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
        const diseases = await DiseaseRepository.getByKeyword(
          keyword,
          startIndex,
          newLimit
        )
        return diseases
      }

      const diseases = await DiseaseRepository.getByKeyword(keyword)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getByRange (attribute, startRange, endRange, page, limit) {
    try {
      if (page) {
        const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
        const diseases = await DiseaseRepository.getByRange(
          attribute,
          startRange,
          endRange,
          startIndex,
          newLimit
        )
        return diseases
      }

      const diseases = await DiseaseRepository.getByRange(
        attribute,
        startRange,
        endRange
      )
      return diseases
    } catch (error) {
      if (error instanceof QueryError) {
        throw error
      }

      handleException(error)
    }
  }

  static async getByThreeDigitsCode (digitsCode, page, limit) {
    try {
      if (page) {
        const [startIndex, newLimit] = getStartIndexAndLimit(page, limit)
        const diseases = await DiseaseRepository.getByThreeDigitsCode(
          digitsCode,
          startIndex,
          newLimit
        )
        return diseases
      }

      const diseases = await DiseaseRepository.getByThreeDigitsCode(digitsCode)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async update (id, disease) {
    try {
      const editedDisease = await DiseaseRepository.update(id, disease)
      return editedDisease
    } catch (error) {
      handleException(error)
    }
  }

  static async remove (id) {
    try {
      const deletedDisease = await DiseaseRepository.remove(id)
      return deletedDisease
    } catch (error) {
      handleException(error)
    }
  }
}
