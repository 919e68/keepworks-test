module Types
  class QueryType < Types::BaseObject
    field :user, Types::UserType, null: true
    def user
      context[:current_user]
    end

    field :movies, [Types::MovieType], null: true
    def movies
      Movie.order(showing_start: 'desc').all
    end

    field :movie, Types::MovieType, null: true do
      argument :id, ID, required: true
    end
    def movie(id:)
      Movie.find(id)
    end

    field :time_slots, [Types::TimeSlotType], null: true
    def time_slots
      TimeSlot.order(:start_time).all
    end

    field :occupied_seats, [Int], null: true do
      argument :theater_id, ID, required: true
      argument :movie_id, ID, required: true
      argument :time_slot_id, ID, required: true
      argument :booking_date, String, required: true
    end
    def occupied_seats(theater_id:, movie_id:, time_slot_id:, booking_date:)
      Booking.where(
        theater_id: theater_id,
        movie_id: movie_id,
        time_slot_id: time_slot_id,
        booking_date: booking_date
      ).pluck(:seat_number)
    end

    field :movie_booking, Types::BookingType, null: true do
      argument :theater_id, ID, required: true
      argument :movie_id, ID, required: true
      argument :time_slot_id, ID, required: true
      argument :booking_date, String, required: true
    end
    def movie_booking(theater_id:, movie_id:, time_slot_id:, booking_date:)
      Booking.find_by(
        user_id: context[:current_user].id, movie_id: movie_id,
        theater_id: theater_id,
        movie_id: movie_id,
        time_slot_id: time_slot_id,
        booking_date: booking_date
      )
    end

    field :bookings, [Types::BookingType], null: true
    def bookings
      current_user = context[:current_user]
      Booking.includes(:movie, :theater, :time_slot).where(user_id: current_user.id).order(booking_date: 'desc', time_slot_id: 'desc').all
    end

    field :booking, Types::BookingType, null: true do
      argument :booking_id, ID, required: true
    end
    def booking(booking_id:)
      Booking.includes(:movie, :theater, :time_slot).find(booking_id)
    end
  end
end
