import React from 'react'
import {
  Mutation
} from 'react-apollo'

import BookingCreate from 'graphql/mutations/BookingCreate.gql'
import BookingCancel from 'graphql/mutations/BookingCancel.gql'

const BookingAction = ({ createBooking, cancelBooking, cancel }) => {
  return (
    <div className="actions">
      {cancel ? (
        <Mutation mutation={BookingCancel}>
          {mutate => (
            <button className="button danger small cancel" onClick={() => cancelBooking(mutate)}>
              CANCEL MY BOOKING ON THIS DATE
            </button>
          )}
        </Mutation>
      ) : (
          <Mutation mutation={BookingCreate}>
            {mutate => (
              <button className="button primary" onClick={() => createBooking(mutate)}>
                BOOK
              </button>
            )}
          </Mutation>
        )}
    </div>
  )
}

export default BookingAction