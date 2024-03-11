import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import diseaseRepository from './repository/disease.repository.js'
import { connectionState, closeConnection } from './connection.js'

const BULK_INSERT_LIMIT = 5000

async function loadICD10Data () {
  await connectionState()

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const cieRawDataPath = path.resolve(__dirname, 'icd10.json')

  const data = fs.readFileSync(cieRawDataPath, 'utf8')
  const cie10Data = JSON.parse(data)

  for (let i = 0; i < cie10Data.length; i += BULK_INSERT_LIMIT) {
    console.log(`Inserting chunk ${i} to ${i + BULK_INSERT_LIMIT}`)
    const chunk = cie10Data.slice(i, i + BULK_INSERT_LIMIT)
    await diseaseRepository.bulkInsert(chunk)
  }
}

loadICD10Data()
  .then(() => {
    closeConnection()
    console.log('ICD10 data loaded successfully')
  })
  .catch((error) => {
    console.error('Error loading ICD10 data', error)
  })
