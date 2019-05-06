import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Booking = ({ booking }) => (
  <li>
    <div className="booking">
      <div className="title">
        <Link to={`/booking/${booking.id}`}>{booking.movie.title}</Link>

      </div>

      <div className="theater">
        {booking.theater.name}
      </div>

      <div className="seat-number">
        SEAT #{booking.seatNumber}
      </div>

      <div className="amount">
        {booking.amount.toFixed(2)}
      </div>

      <div className="coupon">
        {booking.coupon ? booking.coupon.couponCode : null }
      </div>

      <div className="datetime">
        {booking.bookingDate} {moment(booking.timeSlot.startTime, 'HH:mm:ss').format('hh:mm A')}
      </div>
    </div>
  </li>
)

export default Booking
