class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.references :user, foreign_key: true
      t.references :movie, foreign_key: true
      t.references :theater, foreign_key: true
      t.date :booking_date, null: false
      t.references :time_slot, foreign_key: true
      t.integer :seat_number, null: false
      t.decimal :amount, precision: 10, scale: 2
      t.bigint :coupon_id, null: true
      t.timestamps
    end
  end
end