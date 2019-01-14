import React from 'react'
import HighlightList from './HighlightList'

function formatfileName (path) {
  const splitted = path.split('/')

  return splitted[splitted.length - 1]
}

export default function ({ files }) {
  const results = files.map((result, index) => (
    <li key={index}>
      <a href='#' target='_blank'>{formatfileName(result.fileName)}</a>
      <HighlightList highlights={result.highlights} />
    </li>
  ))

  return (
    <ul className='results'>
      {results}
    </ul>
  )
}
