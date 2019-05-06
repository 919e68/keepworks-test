class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.decimal :price, precision: 10, scale: 2
      t.datetime :showing_start, null: false
      t.datetime :showing_end, null: false
      t.timestamps
    end
  end
end