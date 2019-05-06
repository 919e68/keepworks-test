module Types
  class MutationType < Types::BaseObject
    field :booking_create, mutation: Mutations::BookingCreate
    field :booking_cancel, mutation: Mutations::BookingCancel
  end
end
