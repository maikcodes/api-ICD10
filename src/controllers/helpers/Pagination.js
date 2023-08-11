export const formatResults = (results, page) => {
  if (!page) {
    return results
  }

  const totalPages = Math.ceil(results.total / results.limit)

  const resultsFormatted = {
    currentPage: page,
    totalPages,
    data: results.data
  }
  return resultsFormatted
}
