import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PaginateNav = ({ children, totalResults, resultsPerPage, page }) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  const links = []
  if (totalPages === 1) return null
  for (var i = 1; i <= totalPages; i++) {
    const active = i === page
    links.push(children(i, active))
  }

  return <Fragment>{links}</Fragment>
}

PaginateNav.propTypes = {
  children: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  resultsPerPage: PropTypes.number,
  page: PropTypes.number
}

export default PaginateNav
