import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaginateResults = props => {
  const { results, refreshResults } = props
  if (typeof props.children !== 'function') return null
  return (
    <div className={classnames('react-paginated-results', props.className)}>
      {/* props.children is always a function */}
      {results.map(item => props.children(item, refreshResults))}
    </div>
  )
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  refreshResults: PropTypes.func,
  results: PropTypes.array,
  className: PropTypes.string
}

export default PaginateResults
