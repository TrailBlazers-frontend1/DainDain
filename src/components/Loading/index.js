import React, { Children } from 'react'
import "./styles.css"

const Loading = ({isLoading,children}) => {
  return (
    <>
    <div className={isLoading ? 'loader-container' : "loader-container-close"}>
        {/* <p className={isLoading ? 'spinner' : "spinner-close"}>Loading...</p> */}
        <div className={isLoading ? 'spinner lds-dual-ring' : "spinner-close"}></div>
    </div>
    {
          children
      }
    </>
  )
}

export default Loading