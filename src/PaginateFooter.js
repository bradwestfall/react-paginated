import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateFooter = ({ children, fragment, ...rest }) => (
  fragment ? <Fragment>{children}</Fragment> : <div {...rest}>{children}</div>
)

PaginateFooter.defaultProps = {
  fragment: false
}

PaginateFooter.propTypes = {
  fragment: PropTypes.bool
}

export default PaginateFooter

