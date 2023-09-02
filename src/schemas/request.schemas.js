import z from 'zod'

const POSITIVE_NUMBER = /^[1-9]\d*$/

const requestQuerySchema = z.object({
  page: z.string().regex(POSITIVE_NUMBER, 'page must be a positive number'),
  limit: z.string().regex(POSITIVE_NUMBER, 'limit must be a positive number')
})

export function validateRequestQuery ({ query }) {
  return requestQuerySchema.partial().safeParse(query)
}
