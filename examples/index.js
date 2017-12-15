import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import queryString from 'query-string'
import classnames from 'classnames'
import { Paginate, PaginateHeader, PaginateResultsWrap, PaginateResults, PaginateNoResults, PaginateNav, PaginateFooter, PaginateLoading } from 'src'

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
    const resultsPerPage = queryString.parse(window.location.search).resultsPerPage || 3

    const query = queryString.stringify({ page })
    return axios.get(`https://reqres.in/api/users?${query}`)
      .then(res => res.data)
      .then(res => {
        const { total: totalResults, data: results } = res
        this.setState({ totalResults, results, page, resultsPerPage })
      })
      .catch(err => console.err(err))

  }

  render() {
    const { totalResults, results, page, resultsPerPage } = this.state

    return (
      <Paginate totalResults={totalResults} results={results} page={page} resultsPerPage={resultsPerPage}>

        <PaginateHeader>
          <h3>Results:</h3>
        </PaginateHeader>

        <PaginateResultsWrap>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <PaginateResults>
                {results => (
                  <tr key={results.id}>
                    <td>{results.id}</td>
                    <td>{results.first_name}</td>
                  </tr>
                )}
              </PaginateResults>
            </tbody>
          </table>
        </PaginateResultsWrap>

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
