import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class PaginateNav extends React.Component {

  render() {
    return (
      <nav className={classnames('react-paginated-nav', this.props.className)}>
        {this.renderPages()}
      </nav>
    )
  }

  renderPages() {
    const { totalResults, resultsPerPage, page } = this.props
    const totalPages = Math.ceil(totalResults / resultsPerPage)
    const links = []
    if (totalPages === 1) return null
    for (var i = 1; i <= totalPages; i++) {
      let active = i === page
      // props.children is always a function
      links.push(this.props.children(i, active))
    }
    return links
  }

}

PaginateNav.propTypes = {
  children: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  resultsPerPage: PropTypes.number,
  page: PropTypes.number,
  navUrl: PropTypes.string,
  pageClass: PropTypes.string,
  activePageClass: PropTypes.string
}

export default PaginateNav
