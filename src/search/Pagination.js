import React from 'react'

export default function ({ total, from, firstPage, previousPage, nextPage, lastPage }) {
  if (total) {
    return (
      <div className='pagination'>
        <button type='button' className='pagination-arrow pagination-arrow-first' onClick={firstPage} />
        <button type='button' className='pagination-arrow pagination-arrow-previous' onClick={previousPage} />
        <button type='button' className='pagination-arrow pagination-arrow-next' onClick={nextPage} />
        <button type='button' className='pagination-arrow pagination-arrow-last' onClick={lastPage} />
      </div>
    )
  } else {
    return ''
  }
}
