import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'

const PaginateNav = ({ children, fragment, range, ...rest }) => {
  const { hasResults, totalResults, page, resultsPerPage } = useContext(Context)
  if (!hasResults) return null

  const totalPages = Math.ceil(totalResults / resultsPerPage)
  if (totalPages === 1) return null
  const totalRange = range * 2 + 1

  let rangeStart = page - range >= 1 ? page - range : 1
  let rangeEnd = page + range <= totalPages ? page + range : totalPages

  rangeStart =
    rangeEnd - rangeStart < totalPages && rangeEnd === totalPages ? Math.max(totalPages - totalRange, 1) : rangeStart
  rangeEnd = rangeEnd - rangeStart < totalRange && rangeStart === 1 ? Math.min(totalRange, totalPages) : rangeEnd

  // This can often times be the same as `page` but not if we're on the
  // far ends of the spectrum
  const midRange = Math.ceil(rangeEnd - totalRange / 2)
  const pages = Array.from(Array(totalPages)).map((x, i) => ({ page: i + 1 }))
  const args = {
    pages,
    totalResults,
    onPage: page,
    resultsPerPage,
    totalPages,
    range,
    totalRange,
    rangeStart,
    rangeEnd,
    midRange,
  }

  return fragment ? children(args) : <div {...rest}>{children(args)}</div>
}

PaginateNav.defaultProps = {
  fragment: false,
  range: 2,
}

PaginateNav.propTypes = {
  children: PropTypes.func.isRequired,
  fragment: PropTypes.bool,
  range: PropTypes.number,
}

export default PaginateNav
