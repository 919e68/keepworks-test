class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  belongs_to :theater
  belongs_to :time_slot
  belongs_to :coupon, optional: true
end
