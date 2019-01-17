import React from 'react'

export default function ({isLoading}) {
  if (isLoading) {
    return (
      <div className='loading'>
        <div className='background' />
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  } else {
    return ''
  }
}