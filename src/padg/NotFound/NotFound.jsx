import React from 'react'
import error from '../../images/error.svg'
export default function NotFound() {
  return (
    <div>
      <div className="container">
        <img src={error} alt="" className=' mx-auto' />
      </div>
    </div>
  )
}
