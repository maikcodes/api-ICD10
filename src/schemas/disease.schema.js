import {
  isChapterIdValid,
  isFourCodeIdValid,
  isAttributeParamValid,
  isRangeParamValid,
  isTextSafe,
  isThreeCodeIdValid,
  isThreeCodeRangeIdValid,
  isIdValid
} from './helpers/diseaseKeys.helpers.js'
import { validateRequestQuery } from './request.schemas.js'
import z from 'zod'

const chapterIdObjectValidator = z
  .string()
  .refine(isChapterIdValid, 'chapter_id must be a roman number (I-XXII)')

const threeCodeObjectValidator = z
  .string()
  .refine(
    isThreeCodeIdValid,
    'three_code_id must be a string where the first character is an uppercase letter and the last two characters are numbers'
  )

const fourCodeObjectValidator = z
  .string()
  .refine(
    isFourCodeIdValid,
    'four_code_id must be a string where the first character is an uppercase letter, the next two characters are numbers, and the fourth character is a period "." and the last one is a number'
  )

const diseaseSchema = z.object({
  body: z.object({
    chapter_id: chapterIdObjectValidator,
    chapter_title: z.string(),
    range_id: z
      .string()
      .refine(
        isThreeCodeRangeIdValid,
        'range_id must be a string with two codes separated by hyphen "-", each code corresponds to a valid three-digit code'
      ),
    range_title: z.string(),
    three_code_id: threeCodeObjectValidator,
    three_code_title: z.string(),
    four_code_id: fourCodeObjectValidator,
    four_code_title: z.string()
  })
})

const diseaseParamsSchema = z
  .object({
    chapterId: chapterIdObjectValidator,
    threeDigitsCode: threeCodeObjectValidator,
    fourDigitsCode: fourCodeObjectValidator,
    keyword: z
      .string()
      .refine(
        isTextSafe,
        'The search keyword can only contain letters, numbers, blank spaces, and a period "." or hyphen "-"'
      ),
    attribute: z
      .string()
      .refine(
        isAttributeParamValid,
        'The attribute must be a valid parameter ["chapter", "range", "sub_range", "specific_range", "three_code", "four_code"]'
      ),
    range: z.string(),
    id: z.string().refine(isIdValid, 'Invalid id')
  })
  .partial()

const rangeAddedSchema = diseaseParamsSchema.refine(
  ({ attribute, range }) => isRangeParamValid(attribute, range),
  'The specified range must be consistent with the provided attribute'
)

export function validateDisease (input) {
  return diseaseSchema.safeParse(input)
}

export function validatePartialDisease (input) {
  return diseaseSchema.partial().safeParse(input)
}

export function validateRequestParams ({ params }) {
  if ('attribute' in params && 'range' in params) {
    return rangeAddedSchema.safeParse(params)
  }

  return diseaseParamsSchema.safeParse(params)
}

export default {
  params: [validateRequestParams],
  paramsAndBody: [validateRequestParams, validatePartialDisease],
  paramsAndQuery: [validateRequestParams, validateRequestQuery],
  query: [validateRequestQuery],
  strictBody: [validateDisease]
}
