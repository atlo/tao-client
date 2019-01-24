import React from 'react'
import HighlightList from './HighlightList'

export default function ({ files }) {
  const results = files.map((result, index) => (
    <li key={index}>
      <a href={`https://drive.google.com/file/d/${result.googleId}/view`} target="_blank" rel="noopener noreferrer">{result.fileName}</a>
      <HighlightList highlights={result.highlights} />
    </li>
  ))

  return (
    <ul className='results'>
      {results}
    </ul>
  )
}
