import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'

const Paginate = ({ children, page, resultsPerPage, totalResults, results, fragment, ...rest }) => (
  <Context.Provider
    value={{
      totalResults,
      results,
      page,
      resultsPerPage,
      hasResults: Array.isArray(results) && results.length > 0,
    }}>
    {fragment ? children : <div {...rest}>{children}</div>}
  </Context.Provider>
)

Paginate.defaultProps = {
  totalResults: 0,
}

Paginate.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  totalResults: PropTypes.number,
}

export default Paginate
