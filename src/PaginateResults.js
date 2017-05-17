import React from 'react'
import PropTypes from 'prop-types'

const PaginateResults = props => {
  const { results, refreshResults } = props
  if (typeof props.children !== 'function') return null
  return (
    <div className="paginate-results">
      {/* props.children is always a function */}
      {results.map(item => props.children(item, refreshResults))}
    </div>
  )
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  refreshResults: PropTypes.func,
  results: PropTypes.array
}

export default PaginateResults
