module Mutations
  class BookingCancel < Mutations::BaseMutation
    argument :booking_id, ID, required: true

    field :ok, Boolean, null: true
    def resolve(booking_id:)
      result = {
        ok: false
      }

      result[:ok] = true if Booking.delete(booking_id)
      result
    end
  end
end