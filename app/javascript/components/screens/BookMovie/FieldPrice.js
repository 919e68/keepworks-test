import React, { Fragment } from 'react'

const FieldPrice = ({ price, discount }) => {
  let moviePrice = parseFloat(price).toFixed(2)
  if (discount) {
    let discountedPrice = (parseFloat(price) - (parseFloat(price) * discount)).toFixed(2)
    moviePrice = (
      <Fragment>
        {discountedPrice}
        <span>{moviePrice}</span>
      </Fragment>
    )
  }

  return (
    <div className="field">
      <label>Ticket Price</label>
      <h4>
        {moviePrice}
      </h4>
    </div>
  )
}

export default FieldPrice
