import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateNav = ({ children, totalResults, page, resultsPerPage, range, fragment, ...rest }) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  if (totalPages === 1) return null
  const totalRange = (range * 2) + 1

  let rangeStart = page - range >= 1 ? page - range : 1
  let rangeEnd = page + range <= totalPages ? page + range : totalPages

  rangeStart = rangeEnd - rangeStart < totalPages && rangeEnd === totalPages ? Math.max(totalPages - totalRange, 1) : rangeStart
  rangeEnd = rangeEnd - rangeStart < totalRange && rangeStart === 1 ? Math.min(totalRange, totalPages) : rangeEnd

  // This can often times be the same as `page` but not if we're on the
  // far ends of the spectrum
  const midRange = Math.ceil(rangeEnd - (totalRange / 2))
  const args = { totalResults, page, resultsPerPage, totalPages, range, totalRange, rangeStart, rangeEnd, midRange }

  return fragment ? <Fragment>{children(args)}</Fragment> : <div {...rest}>{children(args)}</div>
}

PaginateNav.defaultProps = {
  fragment: false,
  range: 2
}

PaginateNav.propTypes = {
  children: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  resultsPerPage: PropTypes.number,
  page: PropTypes.number,
  range: PropTypes.number
}

export default PaginateNav
