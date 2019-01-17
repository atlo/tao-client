import React from 'react'
import Error from './Error'
import Total from './Total'

export default function ({handleSubmit, handleChange, error, total}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="search-input">
        <input type="text" name="search" onChange={handleChange} />
        <button type='submit' />
      </div>
      <Error error={error} />
      <Total total={total} />
    </form>
  )
}
