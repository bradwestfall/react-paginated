import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import classnames from 'classnames'
import { Paginate, PaginateHeader, PaginateResults, PaginateNoResults, PaginateNav, PaginateFooter, PaginateLoading } from 'src'

// Your function returning a promise
const getResults = page => {
  return axios.get('/results?page=' + page)
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
const App = () => {

  const pageQuery = window.location.search.substr(1).split('&').filter(q => /^page=/.test(q))[0]
  const page = pageQuery ? pageQuery.split('=')[1] : 1

  return (
    <Paginate
      api={getResults}
      resultsPerPage={2}
      page={page}>

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

ReactDOM.render(<App />, document.getElementById('root'))
