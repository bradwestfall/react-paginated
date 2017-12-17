import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateHeader = ({ children, fragment, ...rest }) => (
  fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
)

PaginateHeader.defaultProps = {
  fragment: false
}

PaginateHeader.propTypes = {
  fragment: PropTypes.bool
}

export default PaginateHeader

