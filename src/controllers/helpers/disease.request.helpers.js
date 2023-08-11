export const parseDiseaseRequestBody = (req) => {
  const {
    chapter,
    chapterName,
    fourDigitsCode,
    fourDigitsDescription,
    threeDigitsCode,
    threeDigitsDescription,
    yearVersion
  } = req.body

  const disease = {
    chapter,
    chapterName,
    fourDigitsCode,
    fourDigitsDescription,
    threeDigitsCode,
    threeDigitsDescription,
    yearVersion
  }

  return disease
}
