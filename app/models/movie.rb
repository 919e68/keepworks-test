class Movie < ApplicationRecord
  has_many :bookings
  has_many :movie_theaters
  has_many :theaters, through: :movie_theaters
end
