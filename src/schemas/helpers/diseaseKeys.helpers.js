import { FOUR_CODE_ID, FOUR_CODE_RANGE_ID, ID, THREE_CODE_RANGE_ID, THREE_CODE_ID, SAFE_TEXT } from '../regexValidators.js'

const validChapterNumbers = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
  'XXI', 'XXII'
]

const validRangeParams = ['chapter', 'range', 'sub_range', 'specific_range', 'three_code', 'four_code']

export function isAttributeParamValid (attribute) {
  return validRangeParams.includes(attribute)
}

export function isChapterIdValid (chapter) {
  return validChapterNumbers.includes(chapter)
}

export function isChapterIdRangeValid (chapter) {
  const [startChapter, endChapter] = chapter.split('-')
  return validChapterNumbers.includes(startChapter) && validChapterNumbers.includes(endChapter)
}

export function isFourCodeIdValid (id) {
  return FOUR_CODE_ID.test(id)
}

export function isFourCodeRangeIdValid (id) {
  return FOUR_CODE_RANGE_ID.test(id)
}

export function isIdValid (id) {
  return ID.test(id)
}

export function isTextSafe (text) {
  return SAFE_TEXT.test(text)
}

export function isThreeCodeIdValid (id) {
  return THREE_CODE_ID.test(id)
}

export function isThreeCodeRangeIdValid (id) {
  return THREE_CODE_RANGE_ID.test(id)
}

const attributeRangeMapping = {
  chapter: isChapterIdRangeValid,
  range: isThreeCodeRangeIdValid,
  sub_range: isThreeCodeRangeIdValid,
  specific_range: isThreeCodeRangeIdValid,
  three_code: isThreeCodeRangeIdValid,
  four_code: isFourCodeRangeIdValid
}

export function isRangeParamValid (attribute, range) {
  if (!(attribute in attributeRangeMapping)) {
    return true
  }

  const isRangeValid = attributeRangeMapping[attribute]
  return isRangeValid(range)
}
