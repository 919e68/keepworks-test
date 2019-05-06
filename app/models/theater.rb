class Theater < ApplicationRecord
  has_many :bookings
  has_many :movie_theaters
  has_many :movies, through: :movie_theaters
end
