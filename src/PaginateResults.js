import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateResults = ({ children, totalResults, results, page, resultsPerPage, fragment, ...rest }) => {
  children = results.map(item => children(item))
  return fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
}

PaginateResults.defaultProps = {
  fragment: false,
  results: []
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  results: PropTypes.array
}

export default PaginateResults
