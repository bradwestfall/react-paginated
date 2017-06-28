import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaginateResults = props => {
  const { results, refreshResults, wrap: Wrap } = props
  const children = results.map(item => props.children(item, refreshResults))
  const wrapClassName = classnames('react-paginated-results', props.className)

  return Wrap
    ? <Wrap className={wrapClassName} refreshResults={refreshResults}>{children}</Wrap>
    : <div className={wrapClassName}>{children}</div>
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  refreshResults: PropTypes.func,
  results: PropTypes.array,
  className: PropTypes.string
}

export default PaginateResults
