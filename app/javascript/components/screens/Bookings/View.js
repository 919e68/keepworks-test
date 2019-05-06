import React, { Fragment } from 'react'
import moment from 'moment'
import { Query, Mutation } from 'react-apollo'

import GetBooking from 'graphql/queries/GetBooking.gql'
import BookingCancel from 'graphql/mutations/BookingCancel.gql'

const BookingView = ({ match, history }) => {
  return (
    <div className="container">
      <h1 className="title">Booking Info</h1>
      <div className="booking-view">
        <Query
          query={GetBooking}
          variables={{
            bookingId: match.params.bookingId
          }}
          fetchPolicy="network-only"
        >
          {({ data, loading, error }) => {
            if (loading || error) {
              return null
            }

            const { booking } = data

            return (
              <Fragment>
                <div className="field">
                  <label>Movie Title</label>
                  <h4>{booking.movie.title}</h4>
                </div>

                <div className="field">
                  <label>Movie Proce</label>
                  <h4>{(booking.movie.price).toFixed(2)}</h4>
                </div>

                <div className="field">
                  <label>Theater</label>
                  <h4>{booking.theater.name}</h4>
                </div>

                <div className="field">
                  <label>Seat #</label>
                  <h4>{booking.seatNumber}</h4>
                </div>

                {
                  booking.coupon ? (
                    <div className="field">
                      <label>Coupon</label>
                      <h4>{booking.coupon.couponCode}</h4>
                    </div>
                  ) : null
                }

                {
                  booking.coupon || booking.user.gender == 'Female' ? (
                    <div className="field">
                      <label>Discount</label>
                      {
                        booking.user.gender == 'Female' ? (
                          <h4>
                            <span>Female Discount 5%</span>
                            <span> - {(booking.movie.price * 0.05).toFixed(2)}</span>
                          </h4>
                        ) : null
                      }
                      {
                        booking.coupon ? (
                          <h4>
                            <span>
                              Coupon {booking.coupon.discountType == 'percentage' ? `${booking.coupon.discount}% - ` : ' - '}
                            </span>
                            <span>
                              {booking.coupon.discountType == 'percentage' ? (
                                (booking.movie.price * (booking.coupon.discount/100)).toFixed(2)
                              ) : (
                                booking.coupon.discount.toFixed(2)
                              )}
                            </span>
                          </h4>
                        ) : null
                      }

                    </div>
                  ) : null
                }

                <div className="field">
                  <label>Amount</label>
                  <h4>{booking.amount.toFixed(2)}</h4>
                </div>

                <div className="field">
                  <label>Schedule</label>
                  <h4>{booking.bookingDate} {moment(booking.timeSlot.startTime, 'HH:mm:ss').format('hh:mm A')}</h4>
                </div>

                <div className="actions">
                  <Mutation mutation={BookingCancel}>
                    {mutate => (
                      <button className="button danger small cancel" onClick={() => {
                        mutate({
                          variables: {
                            bookingId: match.params.bookingId
                          }
                        }).then(({ data }) => {
                          if (data.bookingCancel.ok) {
                            history.push('/bookings')
                          }
                        })
                      }}>
                        CANCEL BOOKING
                      </button>
                    )}
                  </Mutation>
                </div>
              </Fragment>
            )
          }}
        </Query>

      </div>
    </div>

  )
}

export default BookingView