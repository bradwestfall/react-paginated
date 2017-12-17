import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import queryString from 'query-string'
import classnames from 'classnames'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {
  Paginate,
  PaginateHeader,
  PaginateResultsWrap,
  PaginateResults,
  PaginateNoResults,
  PaginateNav,
  PaginateFooter, PaginateLoading
} from 'src'

class HomePage extends React.Component {

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

  componentWillReceiveProps() {
    this.fetchResults()
  }

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
              <PaginateResults fragment>
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
              return <Link key={page} className={classnames('page', { active })} to={'?page=' + page}>{page}</Link>
            }}
          </PaginateNav>
        </PaginateFooter>
      </Paginate>
    )
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={HomePage} />
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
