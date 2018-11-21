import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// Note that some props are listed just so they don't end up in ...rest
const PaginateHeader = ({ children, totalResults, page, resultsPerPage, results, fragment, ...rest }) => (
  fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
)

PaginateHeader.defaultProps = {
  fragment: false
}

PaginateHeader.propTypes = {
  fragment: PropTypes.bool
}

export default PaginateHeader

