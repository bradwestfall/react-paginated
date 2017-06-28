import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaginateResults = props => {
  const { results, refreshResults, wrap: Wrap } = props
  const children = results.map(item => props.children(item, refreshResults))

  return Wrap
    ? <Wrap refreshResults={refreshResults} {...props}>{children}</Wrap>
    : <div className={classnames('react-paginated-results', props.className)}>{children}</div>
}

PaginateResults.propTypes = {
  children: PropTypes.func.isRequired,
  refreshResults: PropTypes.func,
  results: PropTypes.array,
  className: PropTypes.string
}

export default PaginateResults
