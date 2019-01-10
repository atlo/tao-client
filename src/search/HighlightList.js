import React from 'react'

export default function (props) {
  const highlights = props.highlights.map(highlight =>
    (<li>{highlight}</li>))

    return (
      <ul className="highlights">
        {highlights}
      </ul>
    )
}
