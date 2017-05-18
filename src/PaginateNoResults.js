import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaginateNoResults = props => (
  <div className={classnames('react-paginated-no-results', props.className)}>{props.children}</div>
)

PaginateNoResults.propTypes = {
  className: PropTypes.string
}

export default PaginateNoResults
