class CreateTheaters < ActiveRecord::Migration[5.2]
  def change
    create_table :theaters do |t|
      t.string :name, null: false, limit: 100
      t.integer :capacity, null: false
      t.timestamps
    end
  end
end