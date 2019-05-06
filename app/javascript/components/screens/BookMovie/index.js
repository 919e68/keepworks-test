import React from 'react'
import moment from 'moment'

import {
  Query,
  withApollo
} from 'react-apollo'

import BookMovieQuery from 'graphql/queries/BookMovie.gql'
import GetOccupied from 'graphql/queries/GetOccupied.gql'

import FieldTitle from './FieldTitle'
import FieldPrice from './FieldPrice'
import FieldBookingDate from './FieldBookingDate'
import FieldTheater from './FieldTheater'
import FieldTimeSlot from './FieldTimeSlot'
import FieldSeat from './FieldSeat'
import FieldCoupon from './FieldCoupon'
import BookingAction from './BookingAction'

import './style.scss'

class BookMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieBooking: null,
      bookingDate: null,
      timeSlotId: null,
      theaterId: null,
      seatNumber: null,
      couponCode: '',
      messages: {},
      occupiedSeats: []
    }
  }

  getOccupiedSeats = async (theaterId, movieId, timeSlotId, bookingDate) => {
    if (theaterId && timeSlotId && movieId && bookingDate) {
      let messages = { ...this.state.messages }

      const { data } = await this.props.client.query({
        query: GetOccupied,
        variables: {
          theaterId,
          movieId,
          timeSlotId,
          bookingDate: moment(bookingDate).format('YYYY-MM-DD')
        },
        fetchPolicy: 'network-only'
      })

      let { seatNumber } = this.state
      const { occupiedSeats, movieBooking } = data
      if (movieBooking) {
        seatNumber = movieBooking.seatNumber
        messages = {}
        messages.timeSlotId = {
          class: 'success',
          message: 'You are already booked on your selected time slot.'
        }
      } else {
        seatNumber = null
        messages = {}
      }

      this.setState({
        occupiedSeats,
        movieBooking,
        seatNumber,
        messages
      })
    }
  }

  selectDate = bookingDate => {
    let messages = { ...this.state.messages }
    delete messages.bookingDate

    const movieId = this.props.match.params.movieId
    const { theaterId, timeSlotId } = this.state
    this.getOccupiedSeats(theaterId, movieId, timeSlotId, bookingDate)

    this.setState({
      bookingDate,
      messages
    })
  }

  selectTheater = theaterId => {
    let messages = { ...this.state.messages }
    delete messages.theaterId

    const movieId = this.props.match.params.movieId
    const { timeSlotId, bookingDate } = this.state
    this.getOccupiedSeats(theaterId, movieId, timeSlotId, bookingDate)

    this.setState({
      theaterId,
      messages
    })
  }

  selectSchedule = timeSlotId => {
    let messages = { ...this.state.messages }
    delete messages.timeSlotId

    const movieId = this.props.match.params.movieId
    const { theaterId, bookingDate } = this.state
    this.getOccupiedSeats(theaterId, movieId, timeSlotId, bookingDate)

    this.setState({
      timeSlotId,
      messages
    })
  }

  selectSeat = seatNumber => {
    if (this.state.theaterId && this.state.timeSlotId && !this.state.occupiedSeats.includes(seatNumber)) {
      let messages = { ...this.state.messages }
      delete messages.seatNumber

      this.setState({
        seatNumber,
        messages
      })
    }
  }

  changeCoupon = (e) => {
    const messages = { ...this.state.messages }
    delete messages.couponCode

    this.setState({
      couponCode: e.target.value,
      messages
    })
  }

  createBooking = (mutate) => {
    const messages = { ...this.state.messages }
    if (!this.state.bookingDate) {
      messages.bookingDate = {
        class: 'error',
        message: 'Please select a date.'
      }
    }

    if (!this.state.theaterId) {
      messages.theaterId = {
        class: 'error',
        message: 'Please select a theater.'
      }
    }

    if (!this.state.timeSlotId) {
      messages.timeSlotId = {
        class: 'error',
        message: 'Please select a time slot.'
      }
    }

    if (!this.state.seatNumber) {
      messages.seatNumber = {
        class: 'error',
        message: 'Please select a seat.'
      }
    }

    if (Object.keys(messages).length == 0) {
      const movieId = this.props.match.params.movieId
      const messages = {}
      const {
        theaterId,
        timeSlotId,
        seatNumber,
        bookingDate,
        couponCode
      } = this.state

      mutate({
        variables: {
          theaterId,
          movieId,
          timeSlotId,
          seatNumber,
          couponCode,
          bookingDate: moment(bookingDate).format('YYYY-MM-DD')
        }
      }).then(({ data }) => {
        if (data.bookingCreate.ok) {
          this.setState({
            messages: {}
          })

          this.props.history.push('/bookings')
        } else {
          data.bookingCreate.errors.forEach(error => {
            error.class = 'error'
            messages[error.path] = error
          })

          this.setState({
            messages
          })
        }
      })
    } else {
      this.setState({
        messages
      })
    }
  }

  cancelBooking = (mutate) => {
    mutate({
      variables: {
        bookingId: this.state.movieBooking.id
      }
    }).then(({ data }) => {
      if (data.bookingCancel.ok) {
        let occupiedSeats = this.state.occupiedSeats
        occupiedSeats.splice(occupiedSeats.indexOf(this.state.seatNumber), 1)

        this.setState({
          movieBooking: null,
          seatNumber: null,
          occupiedSeats,
          messages: {}
        })
      }
    })
  }

  render() {
    const movieId = this.props.match.params.movieId
    let {
      movieBooking,
      bookingDate,
      theaterId,
      timeSlotId,
      seatNumber,
      couponCode,
      occupiedSeats,
      messages
    } = { ...this.state }
    const alreadyBooked = movieBooking ? true : false

    return (
      <div className="container">
        <h1 className="title">Book a Movie</h1>

        <Query
          query={BookMovieQuery}
          variables={{ movieId }}
        >
          {({ data, loading, error }) => {
            if (loading || error) {
              return null
            }

            const { movie, timeSlots, user } = data

            let discount = user.gender == 'Female' ? 0.05 : 0
            let showingEnd = moment(movie.showingEnd, 'YYYY-MM-DD').toDate()
            let showingStart = moment(movie.showingStart, 'YYYY-MM-DD').toDate()
            if (moment().diff(moment(showingStart)) > 0) {
              showingStart = moment().toDate()
            }

            return (
              <div className="booking-form">
                <FieldTitle title={movie.title} />

                <FieldPrice
                  price={movie.price}
                  discount={discount}
                />

                <FieldBookingDate
                  selected={bookingDate}
                  minDate={showingStart}
                  maxDate={showingEnd}
                  onChange={this.selectDate}
                  disabled={alreadyBooked}
                  messages={messages}
                />

                <FieldTheater
                  theaters={movie.theaters}
                  selected={theaterId}
                  disable={alreadyBooked}
                  onChange={this.selectTheater}
                  messages={messages}
                />

                <FieldTimeSlot
                  slots={timeSlots}
                  selected={timeSlotId}
                  disable={alreadyBooked}
                  onChange={this.selectSchedule}
                  messages={messages}
                />

                <FieldSeat
                  count={100}
                  occupiedSeats={occupiedSeats}
                  selected={seatNumber}
                  disabled={alreadyBooked || !bookingDate || !theaterId || !timeSlotId}
                  alreadyBooked={alreadyBooked}
                  onChange={this.selectSeat}
                  messages={messages}
                />

                <FieldCoupon
                  value={couponCode}
                  onChange={this.changeCoupon}
                  disabled={alreadyBooked}
                  messages={messages}
                />

                <BookingAction
                  cancel={alreadyBooked}
                  createBooking={this.createBooking}
                  cancelBooking={this.cancelBooking}
                />
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withApollo(BookMovie)
