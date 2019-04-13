import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'

const PaginateNoResults = ({ children, fragment, ...rest }) => {
  const { renderResults } = useContext(Context)
  if (renderResults) return null
  return fragment ? children : <div {...rest}>{children}</div>
}

PaginateNoResults.defaultProps = {
  fragment: false,
}

PaginateNoResults.propTypes = {
  children: PropTypes.any.isRequired,
  fragment: PropTypes.bool,
}

export default PaginateNoResults
