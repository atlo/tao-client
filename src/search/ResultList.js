import React from 'react'
import HighlightList from './HighlightList'

export default function ({files}) {
  const results = files.map((result, index) => (
    <li key={index}>
      <a href="#" target="_blank">{result.fileName}</a>
      <HighlightList highlights={result.highlights} />
    </li>
  ))
  
  return (
    <ul className="results">
      {results}
    </ul>
  )
}
