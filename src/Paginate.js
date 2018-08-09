import React, { Fragment } from 'react'
import { parseNumeric } from './helpers'

// Components for reference against `child.type`
import PaginateHeader from './PaginateHeader'
import PaginateResults from './PaginateResults'
import PaginateResultsWrap from './PaginateResultsWrap'
import PaginateNoResults from './PaginateNoResults'
import PaginateLoading from './PaginateLoading'
import PaginateFooter from './PaginateFooter'
import PaginateNav from './PaginateNav'

const apiList = [PaginateHeader, PaginateResultsWrap, PaginateResults, PaginateNoResults, PaginateLoading, PaginateFooter, PaginateNav]

class Paginate extends React.Component {

  iterateChildren(children, seek) {
    const { results } = this.props
    const totalResults = parseNumeric(this.props.totalResults)
    const page = parseNumeric(this.props.page)
    const resultsPerPage = parseNumeric(this.props.resultsPerPage)

    return React.Children.map(children, child => {
      // Text nodes
      if (!React.isValidElement(child)) return child

      // If the node is apart of our API but not one of the nodes we seek
      if (apiList.includes(child.type) && !seek.includes(child.type)) return null

      // Start props
      let props = {}

      // Recursively clone children if not PaginateResults or PaginateNav - these components
      // take functions as their child arguments so should not be iterated
      if (child.type !== PaginateResults && child.type !== PaginateNav) {
        props.children = typeof child.props.children === 'function'
         ? child.props.children
         : this.iterateChildren(child.props.children, seek)
      }

      // Only pass our special props into our API components, not DOM nodes
      if ([PaginateResults, PaginateNav].includes(child.type)) {
        props = Object.assign({}, props, { totalResults, results, page, resultsPerPage })
      }

      return React.cloneElement(child, props)
    })
  }

  render() {
    const { children, totalResults, results, page, resultsPerPage, fragment, ...rest } = this.props
    if (!page || !resultsPerPage) return null
    let clonedChildren

    // Async call for results has returned (even if with no results)
    if (Array.isArray(results)) {
      const seek = results.length > 0 ? [PaginateHeader, PaginateResultsWrap, PaginateResults, PaginateFooter, PaginateNav] : [PaginateNoResults]
      clonedChildren = this.iterateChildren(children, seek)

    // If results haven't returned, return the loading component
    } else {
      clonedChildren = React.Children.map(children, child => {
        return child.type === PaginateLoading ? child.props.children : null
      })
    }

    if (!clonedChildren) return null
    return fragment ? <Fragment>{clonedChildren}</Fragment> : <div {...rest}>{clonedChildren}</div>
  }
}

export default Paginate
