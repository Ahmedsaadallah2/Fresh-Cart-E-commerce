import React from 'react'
import error from '../../images/error.svg'
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return (
  <>
        <Helmet>
        <title>Error</title>
        <meta name="description" content="Error component" />
      </Helmet>
    <div>
      <div className="container">
        <img src={error} alt="" className=' mx-auto' />
      </div>
    </div>
  </>
  )
}
