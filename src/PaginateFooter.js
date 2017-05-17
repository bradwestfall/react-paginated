import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaginateFooter = props => (
  <footer className={classnames('react-paginated-footer', props.className)}>{props.children}</footer>
)

PaginateFooter.propTypes = {
  className: PropTypes.string
}

export default PaginateFooter
