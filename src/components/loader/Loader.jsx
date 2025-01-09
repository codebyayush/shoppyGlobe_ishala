import React from 'react'
import "./style.css"

const Loader = ({className}) => {

  // used className prop to add styling to the loader
  return (
    <>
      <span className={`loader ${className}`}></span>
    </>
  )
}

export default Loader;