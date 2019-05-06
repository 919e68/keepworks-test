module Types
  class Types::BookingType < Types::BaseObject
    field :id, ID, null: true
    field :user_id, ID, null: true
    field :theater_id, ID, null: true
    field :movie_id, ID, null: true
    field :booking_date, String, null: true
    field :time_slot_id, ID, null: true
    field :seat_number, Int, null: true
    field :amount, Int, null: true
    field :movie, Types::MovieType, null: true
    field :theater, Types::TheaterType, null: true
    field :time_slot, Types::TimeSlotType, null: true
    field :coupon, Types::CouponType, null: true
    field :user, Types::UserType, null: true
  end
end
