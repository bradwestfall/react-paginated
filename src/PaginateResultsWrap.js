import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateResultsWrap = ({ children, fragment, ...rest }) => (
  fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
)

PaginateResultsWrap.defaultProps = {
  fragment: false
}

PaginateResultsWrap.propTypes = {
  fragment: PropTypes.bool
}

export default PaginateResultsWrap

