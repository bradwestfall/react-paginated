const normalizeInput = (page, resultsPerPage) => {
  page = parseNumeric(page)
  resultsPerPage = parseNumeric(resultsPerPage)
  return { page, resultsPerPage }
}

const parseNumeric = n => {
  const parsed = parseInt(n)
  if (isNaN(parsed) || !Number.isInteger(parsed)) throw new Error('Invalid Number. Must be an integer.')
  return parsed
}

export { normalizeInput }
