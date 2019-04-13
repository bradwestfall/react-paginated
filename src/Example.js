import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import classnames from 'classnames'
import queryString from 'query-string'
import fakeApi from './fake-api'

import { Paginate, PaginateHasResults, PaginateResults, PaginateNoResults, PaginateNav } from './lib'

const SomePage = () => {
  // Read URL
  const page = queryString.parse(window.location.search).page || 1
  const resultsPerPage = queryString.parse(window.location.search).resultsPerPage || 3

  // API Response
  const [response, setResponse] = useState({})

  useEffect(() => {
    fakeApi(page, resultsPerPage).then(response => setResponse(response))
  }, [page, resultsPerPage])

  if (!response.results) return null

  const totalResults = response.totalResults
  const results = response.results

  return (
    <Paginate totalResults={totalResults} results={results} page={page} resultsPerPage={resultsPerPage}>
      <PaginateHasResults fragment>
        <h3>Results:</h3>
      </PaginateHasResults>

      <PaginateHasResults fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <PaginateResults fragment>
              {results => (
                <tr key={results.id}>
                  <td>{results.id}</td>
                  <td>{results.firstName}</td>
                </tr>
              )}
            </PaginateResults>
          </tbody>
        </table>
      </PaginateHasResults>

      <PaginateNoResults>No Results</PaginateNoResults>

      <PaginateNav>
        {({ pages, onPage }) => {
          return pages.map(({ page }) => (
            <Link key={page} className={classnames('page', { active: page === onPage })} to={'?page=' + page}>
              {page}
            </Link>
          ))
        }}
      </PaginateNav>
    </Paginate>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={SomePage} />
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
