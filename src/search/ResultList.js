import React from 'react'
import HighlightList from './HighlightList'

export default function (props) {
  const results = props.results.map(result => (
    <li>
      <p>{result.fileName}</p>
      <HighlightList highlights={result.highlights} />
    </li>
  ))
  
  return (
    <ul className="results">
      {results}
    </ul>
  )
}
