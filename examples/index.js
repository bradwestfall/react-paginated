import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import classnames from 'classnames'
import { Paginate, PaginateResults, PaginateNoResults, PaginateNav, PaginateFooter, PaginateLoading } from 'src'

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
        navUrl="?page=:page"
        resultsPerPage={2}
        page={page}>

      <PaginateResults>
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
        <footer>
          <PaginateNav>
            {(page, active) => {
              return <a key={page} className={classnames('page', { active })} href={'?page=' + page}>{page}</a>
            }}
          </PaginateNav>
        </footer>
      </PaginateFooter>
    </Paginate>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
