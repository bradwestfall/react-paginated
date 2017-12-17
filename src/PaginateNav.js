import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateNav = ({ children, totalResults, results, page, resultsPerPage, fragment, ...rest }) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  const links = []
  if (totalPages === 1) return null
  for (var i = 1; i <= totalPages; i++) {
    const active = i === page
    links.push(children(i, active))
  }
  return fragment ? <Fragment>{links}</Fragment> : <div {...rest}>{links}</div>
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
