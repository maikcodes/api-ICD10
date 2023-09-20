import { describe, it } from 'node:test'
import assert from 'node:assert'
import app from '../../src/app.js'

const BASE_URL = app.get('test_url')

describe('ICD-10 API endpoints suite test', async () => {
  it('Return json of diseases', async () => {
    const url = `${BASE_URL}?page=1&limit=1`

    const result = await fetch(url)

    assert.deepStrictEqual(
      result.headers.get('Content-Type'),
      'application/json; charset=utf-8'
    )

    assert.deepStrictEqual(result.status, 200)
  })

  it('Return the first 10 of all diseases', async () => {
    const url = `${BASE_URL}?page=1&limit=10`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)

    const resultJson = await fetch(url).then(result => result.json())
    assert.deepStrictEqual(resultJson.data.length, 10)
  })

  it('Return the first 10 diseases by chapter', async () => {
    const chapter = 'XX'
    const url = `${BASE_URL}/chapter/${chapter}?page=1&limit=10`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)

    const resultJson = await fetch(url).then(result => result.json())
    assert.deepStrictEqual(resultJson.data.length, 10)
  })

  it('Return a disease by four digits code', async () => {
    const code = 'A00.1'
    const url = `${BASE_URL}/four-digits-code/${code}`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)

    const resultJson = await fetch(url).then(result => result.json())
    assert.deepStrictEqual(resultJson.data.length, 1)
  })

  it('Return the first 10 diseases by keyword', async () => {
    const keyword = 'arthritis'
    const url = `${BASE_URL}/keyword/${keyword}?page=1&limit=10`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)

    const resultJson = await fetch(url).then(result => result.json())
    assert.deepStrictEqual(resultJson.data.length, 10)
  })

  it('Return the first 10 diseases by interval', async () => {
    const attributes = {
      chapter: 'I-I',
      range: 'A00-A09',
      sub_range: 'V01-V99',
      specific_range: 'V01-V09',
      three_code: 'A00-A09',
      four_code: 'A00.1-B09.9'
    }

    for (const [attribute, range] of Object.entries(attributes)) {
      const url = `${BASE_URL}/interval/${attribute}/${range}?page=1&limit=10`

      const result = await fetch(url)
      assert.deepStrictEqual(result.status, 200)

      const resultJson = await fetch(url).then(result => result.json())
      assert.deepStrictEqual(resultJson.data.length, 10)
    }
  })

  it('Return diseases by three digits code', async () => {
    const code = 'A00'
    const url = `${BASE_URL}/three-digits-code/${code}`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)
  })

  const diseaseCrudTest = {
    chapter_id: 'XXII',
    chapter_title: 'developmentTestingOnly',
    range_id: 'Z99-Z99',
    range_title: 'developmentTestingOnly',
    three_code_id: 'Z99',
    three_code_title: 'developmentTestingOnly',
    four_code_id: 'Z99.9',
    four_code_title: 'developmentTestingOnly'
  }

  const diseaseCrudTestUpdated = {
    chapter_id: 'XXII',
    chapter_title: 'developmentTestingOnlyUpdated',
    range_id: 'Z99-Z99',
    range_title: 'developmentTestingOnlyUpdated',
    three_code_id: 'Z99',
    three_code_title: 'developmentTestingOnlyUpdated',
    four_code_id: 'Z99.9',
    four_code_title: 'developmentTestingOnlyUpdated'
  }

  it('Crete new disease', async () => {
    const createdDisease = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(diseaseCrudTest)
    })

    assert.deepStrictEqual(createdDisease.status, 201)
  })

  it('Get disease by id', async () => {
    // get created disease for testing by keyword
    const diseaseToCheck = await fetch(`${BASE_URL}/keyword/${diseaseCrudTest.four_code_title}`).then(result => result.json())
    const expectedDisease = diseaseToCheck.data[diseaseToCheck.data.length - 1]

    // get created disease for testing by id
    const url = `${BASE_URL}/${expectedDisease._id}`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)

    const resultJson = await fetch(url).then(result => result.json())
    const receivedDisease = resultJson.data
    assert.deepStrictEqual(receivedDisease, expectedDisease)
  })

  it('Update disease by id', async () => {
    // get created disease for testing by keyword
    let diseaseToCheck = await fetch(`${BASE_URL}/keyword/${diseaseCrudTest.four_code_title}`).then(result => result.json())
    let expectedDisease = diseaseToCheck.data[diseaseToCheck.data.length - 1]

    // get created disease for testing by id
    const url = `${BASE_URL}/${expectedDisease._id}`

    // update created disease for testing
    const updatedDisease = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(diseaseCrudTestUpdated)
    })
    assert.deepStrictEqual(updatedDisease.status, 200)

    // get edited disease for testing by keyword
    diseaseToCheck = await fetch(`${BASE_URL}/keyword/${diseaseCrudTestUpdated.four_code_title}`).then(result => result.json())
    expectedDisease = diseaseToCheck.data[diseaseToCheck.data.length - 1]

    const resultJson = await fetch(url).then(result => result.json())
    const receivedDisease = resultJson.data
    assert.deepStrictEqual(receivedDisease, expectedDisease)
  })

  it('Delete disease by id', async () => {
    // get created disease for testing by keyword
    const diseaseToCheck = await fetch(`${BASE_URL}/keyword/${diseaseCrudTestUpdated.four_code_title}`).then(result => result.json())
    const expectedDisease = diseaseToCheck.data[diseaseToCheck.data.length - 1]

    // get created disease for testing by id
    const url = `${BASE_URL}/${expectedDisease._id}`

    const result = await fetch(url)
    assert.deepStrictEqual(result.status, 200)

    const resultJson = await fetch(url, {
      method: 'DELETE'
    }).then(result => result.json())
    const receivedDisease = resultJson.data
    assert.deepStrictEqual(receivedDisease, expectedDisease)
  })
}

  // '/:id'
  // '/'
  // '/:id'
  // '/:id'
)
