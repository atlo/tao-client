import React from 'react'

export default function ({ highlights }) {
  const listItems = highlights.map((highlight, index) =>
    (<li key={index} dangerouslySetInnerHTML={{ __html: highlight }} />)
  )

  return (
    <ul className='highlights'>
      {listItems}
    </ul>
  )
}
