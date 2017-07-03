import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaginateResults = props => {
  const { wrap: Wrap, ...rest } = props
  const children = rest.results.map(item => props.children(item))

  return Wrap
    ? <Wrap {...rest}>{children}</Wrap>
    : <div className={classnames('react-paginated-results', props.className)}>{children}</div>
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  results: PropTypes.array,
  className: PropTypes.string
}

export default PaginateResults
