import React from 'react'

const BookingList = ({ children }) => (
  <div className="bookings">
    <ul>
      {children}
    </ul>
  </div>
)

export default BookingList
