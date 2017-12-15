// import React from 'react'
// import PropTypes from 'prop-types'
// import classnames from 'classnames'

// const PaginateHeader = props => (
//   <header className={classnames('react-paginated-header', props.className)}>{props.children}</header>
// )

// PaginateHeader.propTypes = {
//   className: PropTypes.string
// }

// export default PaginateHeader


import React, { Fragment } from 'react'

const PaginateHeader = ({ children }) => (
  <Fragment>{children}</Fragment>
)

export default PaginateHeader
