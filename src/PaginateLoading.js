import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateLoading = ({ children, fragment, ...rest }) => (
  fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
)

PaginateLoading.defaultProps = {
  fragment: false
}

PaginateLoading.propTypes = {
  fragment: PropTypes.bool
}

export default PaginateLoading

