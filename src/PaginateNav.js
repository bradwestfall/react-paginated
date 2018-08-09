import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateNav = ({ children, totalResults, page, resultsPerPage, range, fragment, ...rest }) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  const totalRange = (range * 2) + 1

  let rangeStart = page - range >= 1 ? page - range : 1
  let rangeEnd = page + range <= totalPages ? page + range : totalPages
  rangeStart = rangeEnd - rangeStart < totalPages && rangeEnd === totalPages ? totalPages - totalRange : rangeStart
  rangeEnd = rangeEnd - rangeStart < totalRange && rangeStart === 1 ? totalRange : rangeEnd

  const args = { totalResults, page, resultsPerPage, totalPages, range, totalRange, rangeStart, rangeEnd }

  return fragment ? <Fragment>{children(args)}</Fragment> : <div {...rest}>{children(args)}</div>
}

PaginateNav.defaultProps = {
  fragment: false
}

PaginateNav.propTypes = {
  children: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  resultsPerPage: PropTypes.number,
  page: PropTypes.number
}

export default PaginateNav
