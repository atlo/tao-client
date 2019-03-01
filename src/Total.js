import React from 'react'

export default function ({ total }) {
  if (total !== '') {
    return (
      <p className='total'>
        <strong>{total}</strong> találat
      </p>
    )
  } else {
    return (<p className='total'></p>)
  }
}
