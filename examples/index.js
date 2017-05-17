import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import classnames from 'classnames'
import { Paginate, PaginateHeader, PaginateResults, PaginateNoResults, PaginateNav, PaginateFooter, PaginateLoading } from 'src'

const getResults = page => {
  return axios.get('/results?page=' + page)
    .then(res => res.data)
    .catch(err => console.err(err))
}

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

      <PaginateResults className="foo">
        {(lib, refreshResults) => (
          <div key={lib.id}>{lib.name}</div>
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
