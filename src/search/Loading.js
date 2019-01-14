import React from 'react'

export default function ({isLoading}) {
  if (isLoading) {
    return (
      <div className='loading'>
        <div className='background' />
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  } else {
    return ''
  }
}