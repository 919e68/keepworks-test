module Mutations
  class BookingCreate < Mutations::BaseMutation
    argument :theater_id, ID, required: true
    argument :movie_id, ID, required: true
    argument :time_slot_id, ID, required: true
    argument :seat_number, Int, required: true
    argument :booking_date, String, required: true
    argument :coupon_code, String, required: false

    field :ok, Boolean, null: true
    field :booking, Types::BookingType, null: true
    field :errors, [Types::ErrorType], null: true

    def resolve(theater_id:, movie_id:, time_slot_id:, seat_number:, booking_date:, coupon_code:)
      result = {
        ok: false,
        errors: []
      }

      coupon = nil
      booking = Booking.new
      movie = Movie.find(movie_id)
      amount = movie.price
      current_user = context[:current_user]
      amount = amount - (amount * 0.05) if current_user.gender == 'Female'

      unless coupon_code.empty?
        coupon = Coupon.find_by(coupon_code: coupon_code, is_claimed: false)
        if coupon
          booking.coupon_id = coupon.id
          if coupon.discount_type == 'percentage'
            amount = amount - (movie.price * (coupon.discount/100))
          else
            amount = amount - (coupon.discount)
          end
        else
         result[:errors] << {
            type: 'error',
            path: 'couponCode',
            message: 'Invalid coupon'
          }
        end
      end

      booking.user_id = context[:current_user].id
      booking.theater_id = theater_id
      booking.movie_id = movie_id
      booking.booking_date = booking_date
      booking.time_slot_id = time_slot_id
      booking.seat_number = seat_number
      booking.amount = amount
      ap booking

      unless result[:errors].any?
        if booking.save
          result[:ok] = true
          if coupon
            coupon.update(is_claimed: true, claimed_by: current_user.id)
          end
        end
      end

      result
    end

  end
end