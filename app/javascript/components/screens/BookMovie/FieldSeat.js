import React from 'react'
import classNames from 'classnames'

const FieldSeat = ({ count, occupiedSeats, selected, disabled, onChange, messages, alreadyBooked }) => {
  let seats = []
  for (let seatNum = 1; seatNum <= count; seatNum++) {
    const active = seatNum == selected
    const disableItem = (disabled && seatNum != selected) || (occupiedSeats.includes(seatNum) & !alreadyBooked)

    seats.push((
      <div key={`seat-${seatNum}`} className="seat">
        <div
          className={classNames('seat-inner', { active, disabled: disableItem })}
          onClick={() => !disabled ? onChange(seatNum) : null}
        >
          {seatNum}
        </div>
      </div>
    ))
  }

  return (
    <div className="field">
      <label>Select Seat</label>
      {
        ('seatNumber' in messages) && (
          <div className={`message ${messages.seatNumber.class}`}>
            {messages.seatNumber.message}
          </div>
        )
      }
      <div className="seat-selector">
        {seats}
      </div>
    </div>
  )

}

export default FieldSeat
