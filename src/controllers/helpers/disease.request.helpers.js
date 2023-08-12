export const parseDiseaseRequestBody = (req) => {
  const {
    chapter_id,
    chapter_title,
    range_id,
    range_title,
    three_code_id,
    three_code_title,
    four_code_id,
    four_code_title
  } = req.body

  const disease = {
    chapter_id,
    chapter_title,
    range_id,
    range_title,
    three_code_id,
    three_code_title,
    four_code_id,
    four_code_title
  }

  return disease
}
