import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classnames from 'classnames'
import { normalizeInput } from './helpers'

// Components for reference against `child.type`
import PaginateHeader from './PaginateHeader'
import PaginateResults from './PaginateResults'
import PaginateNoResults from './PaginateNoResults'
import PaginateLoading from './PaginateLoading'
import PaginateFooter from './PaginateFooter'
import PaginateNav from './PaginateNav'

const defaultResultsPerPage = 10
const apiList = [PaginateHeader, PaginateResults, PaginateNoResults, PaginateLoading, PaginateFooter, PaginateNav]

class Paginate extends React.Component {

  constructor() {
    super()
    this.state = {
      totalResults: null,
      results: null,
      page: 1,
      resultsPerPage: defaultResultsPerPage
    }
    this.fetchResults = this.fetchResults.bind(this)
  }

  componentDidMount() {
    const { page, resultsPerPage } = normalizeInput(this.props.page, this.props.resultsPerPage)
    this.setState({ page, resultsPerPage }, this.fetchResults)
  }

  componentWillReceiveProps(nextProps) {
    const { page, resultsPerPage } = normalizeInput(nextProps.page, nextProps.resultsPerPage)
    if (page !== this.state.page || resultsPerPage !== this.state.resultsPerPage) {
      this.setState({ page, resultsPerPage, results: null, totalResults: null }, this.fetchResults)
    }
  }

  fetchResults() {
    this.props.api(this.state.page, this.state.resultsPerPage)
      .then(response => {
        if (!_.isPlainObject(response)) {
          console.error('API response for `react-paginated` is not an object . Received:', response)
          this.setState({ results: [], totalResults: 0 })
        } else {
          const { results, totalResults } = response
          if (!Array.isArray(results) || !Number.isInteger(parseInt(totalResults))) {
            console.error('API response for `react-paginated` is malformed. Received:', response)
            return
          }
          this.setState({ results, totalResults: parseInt(totalResults) })
        }
      }).catch(err => { throw new Error(err) })
  }

  iterateChildren(children, seek) {
    return React.Children.map(children, child => {

      // Text nodes
      if (!React.isValidElement(child)) return child

      // if it's apart of our API and not what we seek, then ignore it
      if (_.includes(apiList, child.type) && !_.includes(seek, child.type)) return null

      // Start props
      let props = {}

      // Recursivly clone children if not PaginateResults or PaginateNav - these components
      // take functions as their child arguments so should not be iterated
      if (child.type !== PaginateResults && child.type !== PaginateNav) {
        props.children = this.iterateChildren(child.props.children, seek)
      }

      // Only pass our special props into our API components, not DOM nodes
      if (_.includes(apiList, child.type)) {
        props = Object.assign({}, props, {...this.state, refreshResults: this.fetchResults})
      }

      return React.cloneElement(child, props)

    })
  }

  render() {
    let clonedChildren

    // Async call for results has returned (even if with no results)
    if (Array.isArray(this.state.results)) {
      const seek = this.state.results.length > 0 ? [PaginateHeader, PaginateResults, PaginateFooter, PaginateNav] : [PaginateNoResults]
      clonedChildren = this.iterateChildren(this.props.children, seek)

    // If results haven't returned, return the loading component
    } else {
      clonedChildren = React.Children.map(this.props.children, child => {
        return child.type === PaginateLoading ? child.props.children : null
      })
    }

    return <div className={classnames('react-paginated', this.props.className)}>{clonedChildren || null}</div>
  }
}

Paginate.defaultProps = {
  page: 1,
  resultsPerPage: defaultResultsPerPage
}

Paginate.propTypes = {
  api: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default Paginate
