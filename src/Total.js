import React from "react";

export default function({ total }) {
  if (total && total.value) {
    return (
      <p className="total">
        <strong>{total.value}</strong> találat
      </p>
    );
  } else {
    return <p className="total" />;
  }
}
