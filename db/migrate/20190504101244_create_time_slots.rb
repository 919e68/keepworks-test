class CreateTimeSlots < ActiveRecord::Migration[5.2]
  def change
    create_table :time_slots do |t|
      t.string :name, null: false, limit: 100
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.timestamps
    end
  end
end