import React from 'react'

export default function ({searchWords, searchWord}) {
  const words = searchWords.map((word, index) => (
    <button key={index} type="button" onClick={searchWord}>{word}</button>
  ))
  
  return (
    <div className="words inline">
      {words}
    </div>
  )
}
