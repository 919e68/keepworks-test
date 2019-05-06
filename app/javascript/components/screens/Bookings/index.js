import React from 'react'
import { Query } from 'react-apollo'
import AllBookings from 'graphql/queries/AllBookings.gql'
import {
  BookingList,
  Booking
} from 'shared/Booking'

import './style.scss'

const Bookings = () => (
  <div className="container">
    <h1 className="title">Bookings</h1>
    <Query
      query={AllBookings}
      fetchPolicy="network-only"
    >
      {({ data, loading, error }) => {
        if (loading || error) {
          return null
        }

        const { bookings } = data

        return (
          <BookingList>
            {bookings.map(booking => (
              <Booking
                key={`booking-${booking.id}`}
                booking={booking}
              />
            ))}
          </BookingList>
        )
      }}
    </Query>
  </div>
)

export default Bookings
