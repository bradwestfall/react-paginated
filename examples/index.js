import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import queryString from 'query-string'
import classnames from 'classnames'
import { Paginate, PaginateHeader, PaginateResults, PaginateNoResults, PaginateNav, PaginateFooter, PaginateLoading } from 'src'

// Your function returning a promise
const getResults = (page, resultsPerPage) => {
  const query = queryString.stringify({ page, resultsPerPage })
  return axios.get(`/results?${query}`)
    .then(res => res.data)
    .catch(err => console.err(err))
}

// Optionable Wrapper for Results
const TableWrap = props => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {props.children}
    </tbody>
  </table>
)

// Example App
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      results: null,
      totalResults: null,
      page: null,
      resultsPerPage: null
    }
    this.fetchResults = this.fetchResults.bind(this)
  }

  componentWillMount() {
    this.fetchResults()
  }

  // Since this example is not an SPA (each page refreshes the page), updating the
  // results with componentWillReceiveProps is not nessesary.
  // componentWillReceiveProps() {
  //   this.fetchResults()
  // }

  fetchResults() {
    const page = queryString.parse(window.location.search).page || 1
    const resultsPerPage = queryString.parse(window.location.search).resultsPerPage || 2

    getResults(page, resultsPerPage)
      .then(response => {
        const { totalResults, results } = response
        this.setState({ totalResults, results, page, resultsPerPage })
      })
  }

  render() {
    const { totalResults, results, page, resultsPerPage } = this.state

    return (
      <Paginate totalResults={totalResults} results={results} page={page} resultsPerPage={resultsPerPage}>

        <PaginateHeader>
          <h3>Results:</h3>
        </PaginateHeader>

        <PaginateResults wrap={TableWrap}>
          {(lib, refreshResults) => (
            <tr key={lib.id}>
              <td>{lib.id}</td>
              <td>{lib.name}</td>
            </tr>
          )}
        </PaginateResults>

        <PaginateNoResults>
          No Results
        </PaginateNoResults>

        <PaginateLoading>
          Loading...
        </PaginateLoading>

        <PaginateFooter>
          <PaginateNav>
            {(page, active) => {
              return <a key={page} className={classnames('page', { active })} href={'?page=' + page}>{page}</a>
            }}
          </PaginateNav>
        </PaginateFooter>
      </Paginate>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
