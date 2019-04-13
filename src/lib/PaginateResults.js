import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'

const PaginateResults = ({ children, fragment, ...rest }) => {
  const { renderResults, results } = useContext(Context)
  if (!renderResults) return null
  children = results.map(item => children(item))
  return fragment ? children : <div {...rest}>{children}</div>
}

PaginateResults.defaultProps = {
  fragment: false,
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  fragment: PropTypes.bool,
}

export default PaginateResults
