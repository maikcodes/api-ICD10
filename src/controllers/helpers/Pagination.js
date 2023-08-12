export const formatResults = (results, page) => {
  if (!page) {
    return results
  }

  const totalPages = Math.ceil(results.total / results.limit)

  const resultsFormatted = {
    current_page: page,
    total_pages: totalPages,
    data: results.data
  }
  return resultsFormatted
}
