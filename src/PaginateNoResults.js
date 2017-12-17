import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateNoResults = ({ children, fragment, ...rest }) => (
  fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
)

PaginateNoResults.defaultProps = {
  fragment: false
}

PaginateNoResults.propTypes = {
  fragment: PropTypes.bool
}

export default PaginateNoResults

