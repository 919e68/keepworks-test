class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  validates :fullname, presence: true
  validates :gender, presence: true

  has_many :bookings
end
