import React from 'react'

export default function ({error}) {
  if (error) {
    return (
      <p className="error">
        A keresés során valamilyen hiba történt. Próbáld újra!
      </p>
    )
  } else {
    return ''
  }
}
