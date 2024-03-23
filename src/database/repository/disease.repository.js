import { Disease } from '../models/disease.js'
import { logException } from '../../middlewares/exception.logs.js'
import { attributesMapping } from './diseaseAttributesMapping.js'
import { QueryError } from '../../errors/QueryError.js'

const handleException = (error) => {
  logException('database', 'disease.repository.js', error)
  throw error
}

export class DiseaseRepository {
  static async findSkipAndLimit (skip = null, limit = null, query = {}) {
    try {
      const results = await Disease.find(query).skip(skip).limit(limit)
      return results
    } catch (error) {
      handleException(error)
    }
  }

  static async foundItemsCount (query) {
    try {
      const countedResults = await Disease.find(query).countDocuments()
      return countedResults
    } catch (error) {
      handleException(error)
    }
  }

  static async executeQuery (skip, limit, query) {
    let result = await this.findSkipAndLimit(skip, limit, query)

    if (typeof skip === 'number') {
      const totalDiseases = await this.foundItemsCount(query)
      result = { data: result, total: totalDiseases, limit }
    }

    return result
  }

  static async create (disease) {
    try {
      const newDisease = new Disease(disease)
      await newDisease.save()
      return newDisease
    } catch (error) {
      handleException(error)
    }
  }

  static async getAll (skip = null, limit = null) {
    try {
      const allDisease = await this.executeQuery(skip, limit)
      return allDisease
    } catch (error) {
      handleException(error)
    }
  }

  static async getByChapterId (chapterId, skip = null, limit = null) {
    try {
      const query = { chapter_id: chapterId }
      const diseases = await this.executeQuery(skip, limit, query)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getByFourDigitsCode (digitsCode) {
    try {
      const diseases = await Disease.find({ four_code_id: digitsCode })
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getById (id) {
    try {
      const disease = await Disease.findById(id)
      return disease
    } catch (error) {
      handleException(error)
    }
  }

  static async getByKeyword (keyword, skip = null, limit = null) {
    try {
      const query = {
        $or: [
          { three_code_title: { $regex: `.*${keyword}.*`, $options: 'i' } },
          { four_code_title: { $regex: `.*${keyword}.*`, $options: 'i' } }
        ]
      }
      const diseases = await this.executeQuery(skip, limit, query)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getByRange (
    attribute,
    startRange,
    endRange,
    skip = null,
    limit = null
  ) {
    try {
      const attributeMapped = attributesMapping[attribute]

      if (!attributeMapped) {
        throw new QueryError(`Invalid attribute ${attribute}`)
      }

      const query = { [attributeMapped]: { $gte: startRange, $lte: endRange } }
      const diseases = await this.executeQuery(skip, limit, query)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async getByThreeDigitsCode (digitsCode, skip = null, limit = null) {
    try {
      const query = { three_code_id: digitsCode }
      const diseases = this.executeQuery(skip, limit, query)
      return diseases
    } catch (error) {
      handleException(error)
    }
  }

  static async update (id, disease) {
    try {
      const updatedDisease = await Disease.findByIdAndUpdate(id, disease, {
        new: true
      })
      return updatedDisease
    } catch (error) {
      handleException(error)
    }
  }

  static async remove (id) {
    try {
      const deletedDisease = await Disease.findByIdAndDelete(id)
      return deletedDisease
    } catch (error) {
      handleException(error)
    }
  }

  static async bulkInsert (diseases) {
    try {
      await Disease.insertMany(diseases)
    } catch (error) {
      handleException(error)
    }
  }

  static async count () {
    try {
      const count = await Disease.countDocuments()
      return count
    } catch (error) {
      handleException(error)
    }
  }
}
