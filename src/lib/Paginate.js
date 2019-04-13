import React from 'react'
import Context from './Context'

const Paginate = ({ children, totalResults, results, page, resultsPerPage, fragment, ...rest }) => {
  if (!page || !resultsPerPage) return null
  return (
    <Context.Provider
      value={{
        totalResults,
        results,
        page,
        resultsPerPage,
        // Are we rendering results
        renderResults: totalResults > 0 && Array.isArray(results) && results.length > 0,
      }}>
      {fragment ? children : <div {...rest}>{children}</div>}
    </Context.Provider>
  )
}

export default Paginate
