const ITEMS_PER_PAGE = 10

export function getStartIndexAndLimit (page, limit = ITEMS_PER_PAGE) {
  return [(page - 1) * limit, limit]
}
