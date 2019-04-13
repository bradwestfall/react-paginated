const database = [
  { id: 1, firstName: 'Ethan' },
  { id: 2, firstName: 'Nathan' },
  { id: 3, firstName: 'Ryan' },
  { id: 4, firstName: 'Jessica' },
  { id: 5, firstName: 'Nic' },
  { id: 6, firstName: 'Ron' },
  { id: 7, firstName: 'Jean' },
  { id: 8, firstName: 'Jacquie' },
]

const fakeApi = (page, resultsPerPage) => {
  const start = page * resultsPerPage - resultsPerPage
  const end = page * resultsPerPage

  return Promise.resolve({
    totalResults: database.length,
    results: database.slice(start, end),
  })
}

export default fakeApi
