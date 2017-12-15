import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateResults = ({ results, children }) => {
  children = results.map(item => children(item))
  return <Fragment>{children}</Fragment>
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  results: PropTypes.array
}

export default PaginateResults
