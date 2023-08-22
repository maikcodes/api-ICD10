import { describe, it } from 'node:test'
import assert from 'node:assert'

// const BASE_URL = 'http://localhost:4000/api/v1/diseases'
const BASE_URL = 'https://api-icd10-dev.fl0.io/api/v1/diseases'

describe('ICD-10 API endpoints suite test', async () => {
  it('Return json of diseases', async () => {
    const url = BASE_URL + '?page=1&limit=30'

    const request = await fetch(url)

    assert.deepStrictEqual(
      request.headers.get('Content-Type'),
      'application/json; charset=utf-8'
    )

    assert.deepStrictEqual(request.status, 200)
  })

  it('Return the first five of all diseases', async () => {
    const url = BASE_URL + '?page=1&limit=5'

    const expectedResult = {
      status: 'OK',
      current_page: '1',
      total_pages: 2135,
      data: [
        {
          _id: '64ab35bc53aab3d22af99b43',
          chapter_id: 'I',
          chapter_title: 'I Certain infectious and parasitic diseases',
          range_id: 'A00-A09',
          range_title: 'A00-A09 Intestinal infectious diseases',
          three_code_id: 'A01',
          three_code_title: 'A01 Typhoid and paratyphoid fevers',
          four_code_id: 'A01.0',
          four_code_title: 'A01.0 Typhoid fever'
        },
        {
          _id: '64ab35bc53aab3d22af99b45',
          chapter_id: 'I',
          chapter_title: 'I Certain infectious and parasitic diseases',
          range_id: 'A00-A09',
          range_title: 'A00-A09 Intestinal infectious diseases',
          three_code_id: 'A01',
          three_code_title: 'A01 Typhoid and paratyphoid fevers',
          four_code_id: 'A01.2',
          four_code_title: 'A01.2 Paratyphoid fever B'
        },
        {
          _id: '64ab35bc53aab3d22af99b4a',
          chapter_id: 'I',
          chapter_title: 'I Certain infectious and parasitic diseases',
          range_id: 'A00-A09',
          range_title: 'A00-A09 Intestinal infectious diseases',
          three_code_id: 'A02',
          three_code_title: 'A02 Other salmonella infections',
          four_code_id: 'A02.2',
          four_code_title: 'A02.2 Localized salmonella infections'
        },
        {
          _id: '64ab35bc53aab3d22af99b4b',
          chapter_id: 'I',
          chapter_title: 'I Certain infectious and parasitic diseases',
          range_id: 'A00-A09',
          range_title: 'A00-A09 Intestinal infectious diseases',
          three_code_id: 'A02',
          three_code_title: 'A02 Other salmonella infections',
          four_code_id: 'A02.8',
          four_code_title: 'A02.8 Other specified salmonella infections'
        },
        {
          _id: '64ab35bc53aab3d22af99b4d',
          chapter_id: 'I',
          chapter_title: 'I Certain infectious and parasitic diseases',
          range_id: 'A00-A09',
          range_title: 'A00-A09 Intestinal infectious diseases',
          three_code_id: 'A03',
          three_code_title: 'A03 Shigellosis',
          four_code_id: 'A03.0',
          four_code_title: 'A03.0 Shigellosis due to Shigella dysenteriae'
        }
      ]
    }

    const result = await fetch(url).then((result) => result.json())

    assert.deepStrictEqual(result, expectedResult)
  })
})
