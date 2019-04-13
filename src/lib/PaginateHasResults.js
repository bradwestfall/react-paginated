import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'

const PaginateHasResults = ({ children, fragment, ...rest }) => {
  const { hasResults } = useContext(Context)
  if (!hasResults) return null
  return fragment ? children : <div {...rest}>{children}</div>
}

PaginateHasResults.defaultProps = {
  fragment: false,
}

PaginateHasResults.propTypes = {
  children: PropTypes.any.isRequired,
  fragment: PropTypes.bool,
}

export default PaginateHasResults
