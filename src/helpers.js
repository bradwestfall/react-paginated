const parseNumeric = n => {
  const parsed = parseInt(n)
  if (isNaN(parsed) || !Number.isInteger(parsed)) throw new Error('Invalid Number. Must be an integer.')
  return parsed
}

export { parseNumeric }
