import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DiseaseRepository } from './repository/disease.repository.js'
import { Connection } from './connection.js'

const BULK_INSERT_LIMIT = 5000

async function seedICD10Data () {
  await Connection.connect()

  const count = await DiseaseRepository.count()
  if (count > 0) {
    console.log('Data already exists, skipping seeding')
    return
  }

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const cieRawDataPath = path.resolve(__dirname, 'icd10.json')

  const data = fs.readFileSync(cieRawDataPath, 'utf8')
  const cie10Data = JSON.parse(data)

  for (let i = 0; i < cie10Data.length; i += BULK_INSERT_LIMIT) {
    console.log(
      `Inserting chunk ${i} to ${i + BULK_INSERT_LIMIT} of ${
        cie10Data.length
      } documents in icd10 collection`
    )
    const chunk = cie10Data.slice(i, i + BULK_INSERT_LIMIT)
    await DiseaseRepository.bulkInsert(chunk)
  }
}

seedICD10Data()
  .then(() => {
    Connection.close()
  })
  .catch((error) => {
    console.error('Error seeding data', error)
  })
